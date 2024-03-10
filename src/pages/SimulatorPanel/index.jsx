import { Layout, Button, theme, Input, Flex, Divider, Slider, Space } from 'antd';
import IconFont from '../../utils/IconFont';
const { Sider, Content } = Layout
function SimulatorPanel() {
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
              padding: 24,
              height: 150,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}>

            </Content>
            <Flex style={{ margin:'8px 4px' }}>
              <Space>
                <Button icon={<IconFont type='icon-reset'/>}>复位</Button>
                <Button icon={<IconFont type='icon-next-step'/>}>下一步</Button>
              </Space>

            </Flex>

            <span>模拟Trace</span>
            <Content style={{
              marginTop: 8,
              padding: 24,
              height: 300,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}>

            </Content>
            <Input addonBefore='Trace文件' style={{ padding: '8px 4px' }} />
            <Flex style={{margin:'4px'}}>
              <Space>
                <Button icon={<IconFont type='icon-backward'/>}>后退</Button>
                <Button icon={<IconFont type='icon-forward'/>}>前进</Button>
              </Space>
            </Flex>
            <Flex style={{margin:'4px'}}>
              <Space>
                <Button icon={<IconFont type='icon-next-step'/>}>重放</Button>
                <Button icon={<IconFont type='icon-random'/>}>随机</Button>
              </Space>   
            </Flex>
            <Flex style={{margin:'4px'}}>
              <Space>
                <Button icon={<IconFont type='icon-open'/>}>打开</Button>
                <Button icon={<IconFont type='icon-save'/>}>保存</Button>
              </Space>
            </Flex>
            <Slider marks={{ 0: '慢', 100: '快' }} defaultValue={50} />

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
            <Sider theme='light' style={{ marginRight: 8, minHeight: 700 }}></Sider>
            <Content style={{
              //   padding: 24,
              minHeight: 772,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              width: '70%'
            }}>
              Content1
            </Content>
            <Content style={{
              //   padding: 24,
              minHeight: 772,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              width: '30%'
            }}>
              Content2
            </Content>

          </Layout>
        </Content>
      </Layout>

    </Layout>
  )
}

export default SimulatorPanel