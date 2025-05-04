import TopBar from './components/TopBar.jsx'
import SideBar from './components/SideBar'
import BottomBar from './components/BottomBar.jsx'
import {Outlet} from 'react-router-dom'

import {Flex, Layout} from 'antd';

function App() {

  return (
    <Layout style={{height: '100vh', width: '100vw'}}>
      <Flex vertical style={{height: '100vh', width: '100vw'}}>
        <TopBar />
        <Flex gap="middle" style={{flex: 1}}>
          <SideBar />
          <Layout style={{flex: 1, padding: '10px'}}>
            <Outlet />
          </Layout>
        </Flex>
        <BottomBar />
      </Flex>
    </Layout>
  );
}

export default App