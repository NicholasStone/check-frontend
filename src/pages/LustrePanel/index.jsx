import {Button, Card, ConfigProvider, Flex, Input, Layout, notification, Upload, Row} from "antd"
import {useRef, useState, useEffect} from "react"
import {request} from "../../utils"
import {useDispatch, useSelector} from "react-redux";
import {setParsedSynLong} from "../../store/modules/lustre/synlong.jsx";
import {setAutos, setDeclaration, setSystemDeclaration} from "../../store/modules/editor/model";
import {Editor} from "@monaco-editor/react"
import {UploadOutlined, RedoOutlined, ExportOutlined} from "@ant-design/icons"

function LustrePanel() {
  const editorRef = useRef(null)
  const {TextArea} = Input
  const [value, setValue] = useState("")
  const [synlongValue, setSynlongValue] = useState(localStorage.getItem('synlongValue') || "");
  const [api, contextHolder] = notification.useNotification();
  // 在EditorPanel组件中，当编辑器内容变化时调用
  const dispatch = useDispatch(); // 假设使用Redux

  const {parsedItems} = useSelector(state => {
    console.log("Redux State:", state.parsedItems); // 调试信息
    return state.parsedItems;
  });

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  // 文件导入处理函数
  const handleFileImport = (info) => {
    if (info.file.status !== 'uploading') {
      const files = info.fileList.map(item => item.originFileObj);
      let content = "";
      let dependNodeContent = "";

      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          // 要求导入两个文件时, DependNodeLib.lus内容必须在前面
          if (file.name === 'DependNodeLib.lus') {
            dependNodeContent = e.target.result + "\n" + dependNodeContent;
          } else {
            content += e.target.result + "\n";
          }
          const newContent = dependNodeContent + content;
          editorRef.current.setValue(newContent);
          setSynlongValue(newContent);
          handleEditorChange(newContent);
        };
        reader.readAsText(file);
      });
    }
  };

  // TODO: 解析函数
  function parseEditorContent(content) {
    const nodes = [];
    const stateMachines = [];
    const variables = [];
    const others = [];
  
    // 匹配节点和函数声明
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

    // 匹配状态机声明
    const smRegex = /automaton\s+([a-zA-Z_][a-zA-Z_0-9]*)?\s*{([^}]*)}/gs;
    while ((match = smRegex.exec(content)) !== null) {
      stateMachines.push({
        id: match[1] || 'anonymous',
        name: match[1] || 'anonymous',
        body: match[2].trim(),
      });
    }

    return {
      nodes,
      stateMachines,
      variables,
      others,
    };
  }

  function handleEditorChange(value) {
    const parsedItems = parseEditorContent(value);
    // 更新全局状态
    dispatch(setParsedSynLong(parsedItems));
    setSynlongValue(value);
  }

  useEffect(() => {
    localStorage.setItem('synlongValue', synlongValue);
  }, [synlongValue]);

  async function checkDataFlow() {
    const code = editorRef.current.getValue();
    const body = {file: code}
    const res = await request.post('/lustre/check-dataflow', body)
    //success
    if (res.code === 200) {
      setValue(res.data.result)
    } else {
      setValue("")
      api.error({
        message: "验证出错",
        description: res.message,
        duration: 5,
      });
    }
  }

  async function convertToJson() {
    setValue("")
    const code = editorRef.current.getValue();
    const body = {file: code}
    const res = await request.post('/lustre/convert', body)
    //success
    if (res.code === 200) {
      setValue(res.data.jsonModel)
    } else {
      setValue("")
      api.error({
        message: "转化出错",
        description: res.message,
        duration: 5,
      });
    }
  }

  // 导出文件函数
  const handleLustreExport = () => {
    const code = editorRef.current.getValue();
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported.lus';
    a.click();
    URL.revokeObjectURL(url);
  };

  // 导出转化结果函数
  const handleExportResult = () => {
    const blob = new Blob([value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_result.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // 同步加载到自动机函数
  const handleSyncToAutomaton = () => {
    try {
      console.log(value, "value")
      const jsonData = JSON.parse(value);
      dispatch(setDeclaration(jsonData.declaration));
      dispatch(setSystemDeclaration(jsonData.system_declaration));
      let tmpAutos = jsonData.automatons;

      if (tmpAutos[0].locations[0].x === undefined) {
        transformAutos(tmpAutos);
      }

      dispatch(setAutos(tmpAutos));

      notification.success({
        message: "同步成功",
        description: "转化结果已同步到自动机",
        duration: 3,
      });
    } catch (error) {
      notification.error({
        message: "同步失败",
        description: "转化结果格式不正确",
        duration: 3,
      });
    }
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
                onClick={convertToJson}
                icon={<RedoOutlined />}
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
            <Editor
              height="660px"
              language="lua"
              value={synlongValue}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                scrollBeyondLastLine: false,
              }}
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
                {/* TODO: 同步到自动机, 这里有个问题是导入的json文件中不包含坐标信息, 而打开json文件需要坐标, 所以会出错. */}
                {/* <Button size="large" style={{float: 'right'}} onClick={handleSyncToAutomaton}>同步到自动机</Button> */}
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

export default LustrePanel