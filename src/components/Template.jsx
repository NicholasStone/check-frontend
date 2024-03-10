import { Layout, Button, theme, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {setAutomationName} from '../store/modules/model';
const { Header, Sider, Content } = Layout
function Template() {
    const dispatch = useDispatch()
    const {automations} = useSelector(state=>state.model)
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout style={{ padding: '12px' }}>
            <Header style={{ background: colorBgContainer }}>
                名字 :<Input style={{ width: '10%', margin: '12px' }} defaultValue={automations[0].name} onChange={(e) =>{
                    dispatch(setAutomationName(e.target.value))
                    console.log(e.target.value);
                    console.log(automations);
                    }} />
                参数 :<Input style={{ width: '20%', margin: '12px' }} />
            </Header>
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 500,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
            </Content>
        </Layout>

    )

}

export default Template


