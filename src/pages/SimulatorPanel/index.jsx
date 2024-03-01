import { Layout, Menu, Button, theme, Input, Flex, Divider, Slider, Space } from 'antd';
import { useState } from 'react';
import IconFont from '../../utils/IconFont';
const { Header, Sider, Content } = Layout
function SimulatorPanel(){
    const [name, setName] = useState('Template')
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
      <Layout style={{ padding: '12px' }}>
        <Layout>
           <Sider theme='light'>
            <Layout>
                <span>使能迁移</span>
                <Content style={{
                    marginTop: 8,
                    marginBottom:8,
                    padding: 24,
                    height: 150,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG
                    }}>

                </Content>
                <span>模拟Trace</span>
                <Content style={{
                    marginTop: 8,
                    padding: 24,
                    height: 300,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG
                    }}>

                </Content>
                <Input addonBefore='Trace文件' style={{padding:'8px'}}/>
                <Flex>
                    <Button>后退</Button>
                    <Button>前进</Button>
                    <Button>重放</Button>
                </Flex>
                <Slider marks={{0:'慢',100:'快'}} defaultValue={50}/>
                
            </Layout>
        
            
            </Sider>

            <Divider type='vertical'></Divider>

            <Content style={{
            //   padding: 24,
            //   minHeight: '100%',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>
            <Layout>
                <Sider theme='light' style={{marginRight:8,minHeight: 700}}></Sider>
                    <Content style={{
                    //   padding: 24,
                    minHeight: 500,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    width:'70%'
                    }}>
                        Content1
                    </Content>
                    <Content style={{
                    //   padding: 24,
                    minHeight: 500,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    width:'30%'
                    }}>
                        Content2
                    </Content>
                
            </Layout>
            </Content> 
        </Layout>
        
        {/* <Layout style={{ padding: '12px' }}>
          <Header style={{ background: colorBgContainer }}>
            名字 :<Input style={{ width: '10%', margin: '12px' }} defaultValue={name} onChange={(e) => setName(e.target.value)} />
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
        </Layout> */}
      </Layout>
    )
  }

export default SimulatorPanel