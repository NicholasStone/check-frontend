import {Button, Flex, Input, Card, ConfigProvider, notification, Layout} from "antd"
import { useRef, useState } from "react"
import { request } from "../../utils/request"
import {useDispatch} from "react-redux";
import {setParsedSynLong} from "../../store/modules/lustre/synlong.jsx";

function LustrePanel(){
    const synlongRef = useRef(null)
    const {TextArea} = Input
    const [value,setValue] = useState("")
    const [api, contextHolder] = notification.useNotification();
    // 在EditorPanel组件中，当编辑器内容变化时调用
    const dispatch = useDispatch(); // 假设使用Redux

    // TODO: 解析函数
    function parseEditorContent(content) {
      return {
        nodes: [{ id: 'node_1', name: 'node_A' }, { id: 'node_2', name: 'node_B' }],
        stateMachines: [{ id: 'stm_1', name: 'stm1' }, { id: 'stm_2', name: 'stm2' }],
        variables: [{ id: 'var_1', name: 'v1' }, { id: 'var_2', name: 'v2' }],
        others: [{ id: 'other_1', name: content }],
      };
    }

    function handleEditorChange() {
      const file = synlongRef.current.resizableTextArea.textArea.value
      const parsedItems = parseEditorContent(file);
      // 更新全局状态
      dispatch(setParsedSynLong(parsedItems)); // 假设有这样一个action
    }

    async function checkDataFlow(){
      const file = synlongRef.current.resizableTextArea.textArea.value
      const body = {file:file}
      const res = await request.post('/lustre/check-dataflow',body)
      //success
      if(res.code===200){
        setValue(res.data.result)
      }
      else{
        setValue("")
        api.error({
          message: "验证出错",
          description: res.message,
          duration:5,
        });
      }
    }

    async function convertToJson(){
      const file = synlongRef.current.resizableTextArea.textArea.value
      const body = {file:file}
      const res = await request.post('/lustre/convert',body)
        //success
        if(res.code===200){
          setValue(res.data.jsonModel)
        }
        else{
          setValue("")
          api.error({
            message: "转化出错",
            description: res.message,
            duration:5,
          });
      }
    }
    return(
        <Layout style={{ padding: '5px' }}>
            <Layout>
                {contextHolder}
                <Flex style={{margin:'1px 1px'}} gap='large'>
                    <Flex vertical style={{width:'50%'}} gap='middle'>
                        <div>
                            <Button style={{float:'left'}} size="large" onClick={convertToJson}>状态机转化</Button>
                            <Button style={{float:'right'}} size="large" onClick={checkDataFlow}>数据流验证</Button>
                        </div>
                        <TextArea ref={synlongRef} style={{resize:'vertical',height:'660px'}} onChange={handleEditorChange} placeholder="在这里输入SynLong代码，再点击对应的按钮进行转化或者验证"></TextArea>
                    </Flex>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorBorderSecondary:'#d9d9d9'
                            },
                        }}
                    >
                        <Card style={{width:'50%', whiteSpace:'pre-wrap'}} title="转化/验证结果">{value}</Card>
                    </ConfigProvider>

                </Flex>

            </Layout>

        </Layout>
    )
}

export default LustrePanel