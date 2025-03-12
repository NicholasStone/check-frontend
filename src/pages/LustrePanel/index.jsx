import {Button, Card, ConfigProvider, Flex, Input, Layout, notification} from "antd"
import {useRef, useState, useEffect} from "react"
import {request} from "../../utils"
import {useDispatch} from "react-redux";
import {setParsedSynLong} from "../../store/modules/lustre/synlong.jsx";

function LustrePanel() {
  const synlongRef = useRef(null)
  const {TextArea} = Input
  const [value, setValue] = useState("")
  const [synlongValue, setSynlongValue] = useState(localStorage.getItem('synlongValue') || "");
  const [api, contextHolder] = notification.useNotification();
  // 在EditorPanel组件中，当编辑器内容变化时调用
  const dispatch = useDispatch(); // 假设使用Redux

  // 文件导入处理函数
  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        synlongRef.current.resizableTextArea.textArea.value = content;
        handleEditorChange(); // 更新全局状态
      };
      reader.readAsText(file);
    }
  };

  // TODO: 解析函数
  function parseEditorContent(content) {
    return {
      nodes: [{id: 'node_1', name: 'node_A'}, {id: 'node_2', name: 'node_B'}],
      stateMachines: [{id: 'stm_1', name: 'stm1'}, {id: 'stm_2', name: 'stm2'}],
      variables: [{id: 'var_1', name: 'v1'}, {id: 'var_2', name: 'v2'}],
      others: [{id: 'other_1', name: content}],
    };
  }

  function handleEditorChange() {
    const file = synlongRef.current.resizableTextArea.textArea.value
    const parsedItems = parseEditorContent(file);
    // 更新全局状态
    dispatch(setParsedSynLong(parsedItems)); // 假设有这样一个action
    setSynlongValue(file); // 更新synlongValue状态
  }

  useEffect(() => {
    localStorage.setItem('synlongValue', synlongValue);
  }, [synlongValue]);

  async function checkDataFlow() {
    const file = synlongRef.current.resizableTextArea.textArea.value
    const body = {file: file}
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
    const file = synlongRef.current.resizableTextArea.textArea.value
    const body = {file: file}
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

  return (
    <Layout style={{padding: '5px'}}>
      <Layout>
        {contextHolder}
        <Flex style={{margin: '1px 1px'}} gap='large'>
          <Flex vertical style={{width: '50%'}} gap='middle'>
            <div>
              <Button style={{float: 'left'}} size="large" onClick={convertToJson}>状态机转化</Button>
              {/*<Button style={{float: 'right'}} size="large" onClick={checkDataFlow}>数据流验证</Button>*/}
            </div>
            <input type="file" accept=".txt" onChange={handleFileImport} style={{marginBottom: '10px'}} />
            <TextArea ref={synlongRef} style={{resize: 'vertical', height: '660px'}} onChange={handleEditorChange}
                      value={synlongValue}
                      placeholder="在这里输入SynLong代码或者点击左上角导入，再点击对应的按钮进行转化"></TextArea>
          </Flex>
          <ConfigProvider
            theme={{
              token: {
                colorBorderSecondary: '#d9d9d9'
              },
            }}
          >
            <Card style={{width: '50%', whiteSpace: 'pre-wrap'}} title="转化结果">{value}</Card>
          </ConfigProvider>

        </Flex>

      </Layout>

    </Layout>
  )
}

export default LustrePanel