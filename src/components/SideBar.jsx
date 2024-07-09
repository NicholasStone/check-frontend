import {
    BarChartOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Layout, Menu} from 'antd';

function SideBar() {
    const { Sider} = Layout;

  const items = [
    {
      key: 1,
      icon: <UserOutlined />,
      label: "Node",
    },
    {
      key: 2,
      icon: <VideoCameraOutlined />,
      label: "StateMachine",
    },
    {
      key: 3,
      icon: <UploadOutlined />,
      label: "Variable",
    },
    {
      key: 4,
      icon: <BarChartOutlined />,
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