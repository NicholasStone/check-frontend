import 'antd/dist/reset.css'
import TopBar from './components/TopBar.jsx'
import SideBar from './components/SideBar'
import BottomBar from './components/BottomBar.jsx'
import {Outlet} from 'react-router-dom'
import {ConfigProvider, Flex, Layout} from 'antd';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 0,
          colorPrimary: "#0E5890",
        },
        // cssVar: true,
      }}
    >
      <Layout style={{height: '100%', width: '100%'}}>
        <Flex vertical style={{height: '100%', width: '100%'}}>
          <TopBar />
          <Flex gap="middle" style={{height: 'calc(100vh - 6vh)'}}>
            <SideBar />
            <Layout>
              <Outlet />
            </Layout>
          </Flex>
          <BottomBar />
        </Flex>
      </Layout>
    </ConfigProvider>
  );
}

export default App