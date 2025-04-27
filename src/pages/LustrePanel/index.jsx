import {Button, Card, ConfigProvider, Flex, Input, Layout, notification, Upload, Row} from "antd"
import {useState} from "react"
import {request} from "../../utils"
import {useDispatch} from "react-redux";
import {setParsedSynLong} from "../../store/modules/lustre/synlong.jsx";
import {setAutos, setDeclaration, setSystemDeclaration} from "../../store/modules/editor/model";
import {UploadOutlined, ExportOutlined} from "@ant-design/icons"
import MonacoEditor from "./MonacoEditor";

function LustrePanel() {
  const [value, setValue] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();

  const handleEditorChange = (newValue) => {
    const parsedItems = parseEditorContent(newValue);
    dispatch(setParsedSynLong(parsedItems));
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
          handleEditorChange(newContent);
        };
        reader.readAsText(file);
      });
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
    const blob = new Blob([value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported.lus';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportResult = () => {
    const blob = new Blob([value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_result.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout style={{ padding: "5px" }}>
      <Layout>
        {contextHolder}
        <Flex style={{ margin: "1px 1px" }} gap="large">
          <Flex vertical style={{ width: "50%" }} gap="middle">
            <Row>
              <Button
                size="large"
                onClick={() => {
                  setValue("");
                  const code = editorRef.current.getValue();
                  const body = { file: code };
                  request.post('/lustre/convert', body).then(res => {
                    if (res.code === 200) {
                      setValue(res.data.jsonModel);
                    } else {
                      setValue("");
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
                style={{ marginLeft: "auto" }}
                size="large"
                onClick={handleLustreExport}
                icon={<ExportOutlined />}
              >
                导出文本
              </Button>
            </Row>
            <MonacoEditor
              value={value}
              onChange={handleEditorChange}
              onExport={handleLustreExport}
            />
          </Flex>
          <ConfigProvider
            theme={{
              token: {
                colorBorderSecondary: "#d9d9d9",
              },
            }}
          >
            <Flex vertical style={{ width: "50%" }}>
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
                  height: "660px, ",
                  overflowY: "auto",
                }}
                title="转化结果"
              >
                {value}
              </Card>
            </Flex>
          </ConfigProvider>
        </Flex>
      </Layout>
    </Layout>
  );
}

export default LustrePanel;