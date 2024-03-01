import { Layout, Menu, Button, theme, Input } from 'antd';
import { useState } from 'react';
import IconFont from '../../utils/IconFont';
const { Header, Sider, Content } = Layout
function EditorPanel() {
  const [name, setName] = useState('Template')
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ padding: '12px' }}>
      <Sider theme='light'>
        <Menu
          mode="inline"
          defaultSelectedKeys={['2']}
          items={[
            {
              key: '1',
              icon: <IconFont type='icon-paper' />,
              label: '声明',
            },
            {
              key: '2',
              icon: <IconFont type='icon-clock' />,
              label: name,
            },
            {
              key: '3',
              icon: <IconFont type='icon-paper' />,
              label: '模型声明',
            },
          ]}
        />
      </Sider>
      <Layout style={{ padding: '12px' }}>
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
      </Layout>
    </Layout>
  )
}

export default EditorPanel