import TopBar from './components/TopBar.jsx'
import SideBar from './components/SideBar'
import BottomBar from './components/BottomBar.jsx'
import {Outlet} from 'react-router-dom'

import {Flex, Layout} from 'antd';

function App() {

  return (
    <Layout>
      <Flex vertical>
        <TopBar/>
        <Flex>
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
              <Outlet/>
            </Flex>
          </Layout>
        </Flex>
        <BottomBar/>
      </Flex>
    </Layout>

  );
}

export default App