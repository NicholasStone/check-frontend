import {Layout} from "antd";

function BottomBar() {
  const {Footer} = Layout;

  return (
    <Footer
      style={{
        textAlign: 'center',
        overflow: 'auto',
        position: 'fixed',
        left: '13.5vw',
        right: 0,
        bottom: 0,
        height: '3vh',
      }}
    >
      模型检查软件 ©{new Date().getFullYear()} Created by ECNU
    </Footer>
  )
}

export default BottomBar