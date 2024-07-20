import {Layout, Menu} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {setSelectedMode} from "../store/modules/editor/bar.jsx";
import {FileTextOutlined, FormOutlined, PlayCircleOutlined, QuestionCircleOutlined,} from '@ant-design/icons';

function TopBar() {
  const {Header} = Layout;
  const items = [
    {key: 'lustre', label: 'SynLong', icon: <FileTextOutlined/>},
    {key: 'editor', label: '编辑器', icon: <FormOutlined/>},
    {key: 'verifier', label: '验证器', icon: <QuestionCircleOutlined/>},
    {key: 'simulator', label: '模拟器', icon: <PlayCircleOutlined/>},
  ];
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {selectedMode} = useSelector(state => state.bar)
  console.log(selectedMode)
  useEffect(() => {
    navigate('/' + selectedMode)
  }, [])

  return (
    <Header
      style={{
        overflow: 'auto',
        width: '100vw',
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0,
        background: 'linear-gradient(to right, lightblue, white)',// TODO: 这里有问题, 不加这句两边为什么有些黑色区域
      }}>
      <div className="demo-logo"/>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={items}
        style={{
          flex: 1,
          minWidth: 0,
          background: 'linear-gradient(to right, lightblue, white)',// 渐变色
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