import {Button, Flex} from 'antd'
import Toolbar from './components/Toolbar'
import Modebar from './components/Modebar'
import EditorPanel from './pages/EditorPanel'
function App(){
  return(
    <Flex vertical>
      <Toolbar/>
      <Modebar/>
      <EditorPanel/>
    </Flex>
  )
  
}

export default App