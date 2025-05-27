import {Layout, Menu, ConfigProvider} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {setSelectedMode} from "../store/modules/editor/bar.jsx";
import {FileTextOutlined, FormOutlined, PlayCircleOutlined, QuestionCircleOutlined,} from '@ant-design/icons';


function TopBar() {
  const {Header} = Layout;
  const items = [
    {key: 'lustre', label: 'Lustre编辑器', icon: <FileTextOutlined/>},
    {key: 'editor', label: '自动机', icon: <FormOutlined/>},
    {key: 'verifier', label: '验证器', icon: <QuestionCircleOutlined/>},
    // {key: 'simulator', label: '模拟器', icon: <PlayCircleOutlined/>},
  ];
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {selectedMode} = useSelector(state => state.bar)

  useEffect(() => {
    navigate('/' + selectedMode)
  }, [])

  return (
    <Header
      style={{
        background: 'linear-gradient(to right, #0E5890, #ffffff 30%)',
        height: '4vh',
        lineHeight: '4vh',
        display: 'flex',
        alignItems: 'flex-start',
        paddingLeft: '10px',
      }}
      >
      <div className="demo-logo" style={{
        height: '100%',
        width: '4vw',
        lineHeight: '4vh',
        display: 'flex',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold',
        marginRight: '10px',
      }}>
        Brand
      </div>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemColor: 'white',
              itemHoverColor: 'white', // Optional: if you want hover color to also be white
              itemSelectedColor: 'white', // Optional: for selected items
              horizontalItemSelectedColor: 'white', // Optional: for selected items in horizontal menu
            },
          },
        }}
      >
        <Menu
          className="topbar-menu"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{
            minWidth: 0,
            background: 'transparent',
            color: 'white',
            height: '100%',
          }}
          onClick={(e) => {
            const mode = e.key;
            dispatch(setSelectedMode(mode));
            navigate('/' + mode); // 导航到对应的页面
          }}
        />
      </ConfigProvider>
    </Header>
  )
}

export default TopBar