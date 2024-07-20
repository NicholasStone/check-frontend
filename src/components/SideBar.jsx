import {ContainerOutlined, FunctionOutlined, MoreOutlined, NodeIndexOutlined,} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import {useSelector} from 'react-redux';

function SideBar() {
  const {Sider} = Layout;

  const {parsedItems} = useSelector(state => state.parsedItems); // 假设全局状态中存储的解析结果
  const items = [
    {
      key: 1,
      icon: <FunctionOutlined/>,
      label: "Node",
      children: parsedItems.nodes.map(node => ({
        key: node.id,
        label: node.name,
        icon: <FunctionOutlined/>,
      })),
    },
    {
      key: 2,
      icon: <NodeIndexOutlined/>,
      label: "StateMachine",
      children: parsedItems.stateMachines.map(stm => ({
        key: stm.id,
        label: stm.name,
        icon: <NodeIndexOutlined/>,
      })),
    },
    {
      key: 3,
      icon: <ContainerOutlined/>,
      label: "Variable",
      children: parsedItems.variables.map(variable => ({
        key: variable.id,
        label: variable.name,
        icon: <ContainerOutlined/>,
      })),
    },
    {
      key: 4,
      icon: <MoreOutlined/>,
      label: "Others",
      children: parsedItems.others.map(other => ({
        key: other.id,
        label: other.name,
        icon: <ContainerOutlined/>,
      })),
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