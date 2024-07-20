import Toolbar from './components/Toolbar'
import TopBar from './components/TopBar.jsx'
import SideBar from './components/SideBar'
import BottomBar from './components/BottomBar.jsx'
import {Outlet} from 'react-router-dom'

import {Flex, Layout} from 'antd';

function App() {

  return (
    <Layout>
      <TopBar/>
      <SideBar/>
      <Layout style={{
        overflow: 'auto',
        position: 'absolute',
        height: '86%',
        width: "86%",
        left: '14vw',
        top: '7.5vh',
        right: 0,
        bottom: 0,
      }}>
        <Flex vertical>
          <Toolbar/>
          <Outlet/>
        </Flex>
      </Layout>
      <BottomBar/>
    </Layout>

  );
}

export default App