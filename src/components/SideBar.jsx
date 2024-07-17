import {
  NodeIndexOutlined, MoreOutlined, FunctionOutlined, ContainerOutlined,
} from '@ant-design/icons';
import {Layout, Menu} from 'antd';

function SideBar() {
    const { Sider} = Layout;

  const items = [
    {
      key: 1,
      icon: <FunctionOutlined />,
      label: "Node",
      children: [
        { key: 'node_1', label: 'node_A', icon: <FunctionOutlined /> },
        { key: 'node_2', label: 'node_B', icon: <FunctionOutlined /> },
      ],
    },
    {
      key: 2,
      icon: <NodeIndexOutlined />,
      label: "StateMachine",
      children: [
        { key: 'stm_1', label: 'stm1', icon: <NodeIndexOutlined /> },
        { key: 'stm_2', label: 'stm2', icon: <NodeIndexOutlined /> },
      ],
    },
    {
      key: 3,
      icon: <ContainerOutlined />,
      label: "Variable",
      children: [
        { key: 'var_1', label: 'v1', icon: <ContainerOutlined /> },
        { key: 'var_2', label: 'v2', icon: <ContainerOutlined /> },
      ],
    },
    {
      key: 4,
      icon: <MoreOutlined />,
      label: "Others",
    },
  ];

  return (
      <Sider
        theme="light"
        style={{
            overflow: 'auto',
            position: 'fixed',
            left: 0,
            top: '7.5vh',
            bottom: 0,
        }}
      >
          <div className="demo-logo-vertical"/>
          <Menu mode="inline" defaultSelectedKeys={['1']} items={items}/>
      </Sider>
    );
}
export default SideBar