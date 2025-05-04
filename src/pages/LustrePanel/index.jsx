import {Button, Card, ConfigProvider, Flex, Input, Layout, notification, Upload, Row} from "antd"
import {useState, useRef, useEffect} from "react"
import {request} from "../../utils"
import {useDispatch} from "react-redux";
import {setParsedSynLong} from "../../store/modules/lustre/synlong.jsx";
import {setAutos, setDeclaration, setSystemDeclaration} from "../../store/modules/editor/model";
import {UploadOutlined, ExportOutlined} from "@ant-design/icons"
import MonacoEditor from "./MonacoEditor";

function LustrePanel() {
  const [resultValue, setResultValue] = useState(""); // 存储转换结果
  const [editorCode, setEditorCode] = useState(""); // 存储编辑器代码
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  // Load cached content when component mounts
  useEffect(() => {
    const cachedContent = localStorage.getItem('lustre_editor_content');
    if (cachedContent) {
      setEditorCode(cachedContent);
      // Set editor content if editor is ready
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.setValue(cachedContent);
          handleEditorChange(cachedContent);
        }
      }, 100);
    }
  }, []);

  const handleEditorChange = (newValue) => {
    setEditorCode(newValue);
    const parsedItems = parseEditorContent(newValue);
    dispatch(setParsedSynLong(parsedItems));
    // Save to localStorage whenever content changes
    localStorage.setItem('lustre_editor_content', newValue);
  };

  const handleFileImport = (info) => {
    if (info.file.status !== 'uploading') {
      const files = info.fileList.map(item => item.originFileObj);
      let content = "";
      let dependNodeContent = "";

      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (file.name === 'DependNodeLib.lus') {
            dependNodeContent = e.target.result + "\n" + dependNodeContent;
          } else {
            content += e.target.result + "\n";
          }
          const newContent = dependNodeContent + content;
          // Use the ref to set editor content
          if (editorRef.current) {
            editorRef.current.setValue(newContent);
          }
          handleEditorChange(newContent);
          
          // Save file metadata to localStorage
          const fileCache = JSON.parse(localStorage.getItem('lustre_file_cache') || '[]');
          const fileInfo = {
            name: file.name,
            lastModified: file.lastModified,
            timestamp: new Date().getTime()
          };
          
          // Check if file already exists in cache
          const fileIndex = fileCache.findIndex(f => f.name === file.name);
          if (fileIndex >= 0) {
            fileCache[fileIndex] = fileInfo;
          } else {
            fileCache.push(fileInfo);
          }
          
          // Keep only the most recent 10 files
          if (fileCache.length > 10) {
            fileCache.sort((a, b) => b.timestamp - a.timestamp);
            fileCache.length = 10;
          }
          
          localStorage.setItem('lustre_file_cache', JSON.stringify(fileCache));
        };
        reader.readAsText(file);
      });
    }
  };

  // Add function to clear cache
  const clearCache = () => {
    localStorage.removeItem('lustre_editor_content');
    localStorage.removeItem('lustre_file_cache');
    notification.success({
      message: '缓存已清除',
      description: '所有缓存的文件内容已被清除',
      duration: 3
    });
    setEditorCode("");
    setResultValue("");
    if (editorRef.current) {
      editorRef.current.setValue("");
    }
  };

  const parseEditorContent = (content) => {
    const nodes = [];
    const stateMachines = [];
    const variables = [];
    const others = [];
  
    const opRegex = /(function|node)\s+([a-zA-Z_][a-zA-Z_0-9]*)\s*\(([^)]*)\)\s*returns\s*\(([^)]*)\)\s*;/g;
    let match;
    while ((match = opRegex.exec(content)) !== null) {
      nodes.push({
        kind: match[1],
        id: match[2],
        name: match[2],
        params: match[3].split(';').map(param => param.trim()).filter(Boolean),
        returns: match[4].split(';').map(ret => ret.trim()).filter(Boolean),
      });
    }

    const smRegex = /automaton\s+([a-zA-Z_][a-zA-Z_0-9]*)?\s*{([^}]*)}/gs;
    while ((match = smRegex.exec(content)) !== null) {
      stateMachines.push({
        id: match[1] || 'anonymous',
        name: match[1] || 'anonymous',
        body: match[2].trim(),
      });
    }

    return { nodes, stateMachines, variables, others };
  };

  const handleLustreExport = () => {
    const blob = new Blob([editorCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported.lus';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportResult = () => {
    const blob = new Blob([resultValue], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_result.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout style={{ padding: "5px", height: "100vh" }}>
      <Layout style={{ height: "100%" }}>
        {contextHolder}
        <Flex style={{ margin: "1px 1px", height: "100%" }} gap="large">
          <Flex vertical style={{ width: "80%", height: "100%" }} gap="middle">
            <Row>
              <Button
                size="large"
                onClick={() => {
                  setResultValue("");
                  const code = editorRef.current
                    ? editorRef.current.getValue()
                    : "";
                  const body = { file: code };
                  request.post("/lustre/convert", body).then((res) => {
                    if (res.code === 200) {
                      setResultValue(res.data.jsonModel);
                    } else {
                      setResultValue("");
                      api.error({
                        message: "转化出错",
                        description: res.message,
                        duration: 5,
                      });
                    }
                  });
                }}
                icon={<ExportOutlined />}
                type="primary"
              >
                状态机转化
              </Button>
              <Upload
                accept=".txt,.lus"
                showUploadList={false}
                multiple
                customRequest={({ file, onSuccess }) => {
                  setTimeout(() => {
                    onSuccess("ok");
                  }, 0);
                }}
                onChange={handleFileImport}
              >
                <Button
                  style={{ marginLeft: "10px" }}
                  size="large"
                  icon={<UploadOutlined />}
                >
                  上传文件
                </Button>
              </Upload>
              <Button
                style={{ marginLeft: "10px" }}
                size="large"
                onClick={clearCache}
                danger
              >
                清除缓存
              </Button>
              <Button
                style={{ marginLeft: "auto" }}
                size="large"
                onClick={handleLustreExport}
                icon={<ExportOutlined />}
              >
                导出文本
              </Button>
            </Row>
            <MonacoEditor
              ref={editorRef}
              value={editorCode}
              onChange={handleEditorChange}
              onExport={handleLustreExport}
              style={{ flex: 1, height: "100%" }}
            />
          </Flex>
          <ConfigProvider
            theme={{
              token: {
                colorBorderSecondary: "#d9d9d9",
              },
            }}
          >
            <Flex vertical style={{ width: "20%", height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Button
                  size="large"
                  style={{ float: "right" }}
                  onClick={handleExportResult}
                >
                  导出转化结果
                </Button>
              </div>
              <Card
                style={{
                  whiteSpace: "pre-wrap",
                  resize: "vertical",
                  height: "calc(100vh - 120px)",
                  overflowY: "auto",
                }}
                title="转化结果"
              >
                {resultValue}
              </Card>
            </Flex>
          </ConfigProvider>
        </Flex>
      </Layout>
    </Layout>
  );
}

export default LustrePanel;