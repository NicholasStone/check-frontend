import { Layout, Menu, Button, theme, Input } from 'antd';
// import { useState } from 'react';
import IconFont from '../../utils/IconFont';
import Template from '../../components/Template';
import { useSelector } from 'react-redux';
const { Header, Sider, Content } = Layout
function EditorPanel() {
  // const [name, setName] = useState('Template')
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();
  const {automations} = useSelector(state=>state.model)
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
              label: automations[0].name,
            },
            {
              key: '3',
              icon: <IconFont type='icon-paper' />,
              label: '模型声明',
            },
          ]}
        />
      </Sider>
      <Template/>
    </Layout>
  )
}

export default EditorPanel