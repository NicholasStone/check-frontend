import {Button, Flex} from 'antd'
import Toolbar from './components/Toolbar'
import Modebar from './components/Modebar'
import { Outlet } from 'react-router-dom'
function App(){
  return(
    <Flex vertical>
      <Toolbar/>
      <Modebar/>

      <Outlet/>
    </Flex>
  )
  
}

export default App