import TopBar from './components/TopBar.jsx'
import SideBar from './components/SideBar'
import BottomBar from './components/BottomBar.jsx'
import {Outlet} from 'react-router-dom'

import {Flex, Layout} from 'antd';

function App() {

  return (
    <Layout style={{height: '100%', width: '100%'}}>
      <Flex vertical style={{height: '100%', width: '100%'}}>
        <TopBar />
        <Flex gap="middle" style={{height: 'calc(100vh - 130px)'}}>
          <SideBar />
          <Layout>
            <Outlet />
          </Layout>
        </Flex>
        <BottomBar />
      </Flex>
    </Layout>
  );
}

export default App