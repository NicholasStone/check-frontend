import {Layout, Menu} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {setSelectedMode} from "../store/modules/editor/bar.jsx";
import {FileTextOutlined, FormOutlined, PlayCircleOutlined, QuestionCircleOutlined,} from '@ant-design/icons';
import '../styles/components/TabBar.css';

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
        height: '35px',
        lineHeight: '35px',
        display: 'flex',
        alignItems: 'flex-start',
        paddingLeft: '10px',
      }}
      >
      <div className="demo-logo" style={{
        height: '100%',
        width: '35px',
        lineHeight: '35px',
        display: 'flex',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold',
        marginRight: '10px',
      }}>
        Brand
      </div>
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
    </Header>
  )
}

export default TopBar