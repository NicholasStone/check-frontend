import {Layout, Menu} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {setSelectedMode} from "../store/modules/editor/bar.jsx";

function TopBar() {
    const {Header} = Layout;
    const items = [
        {key: 'lustre', label: 'SynLong'},
        {key: 'editor', label: '编辑器'},
        {key: 'verifier', label: '验证器'},
        {key: 'simulator', label: '模拟器'},
    ];
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { selectedMode } = useSelector(state => state.bar)
    console.log(selectedMode)
    useEffect(() => {
      navigate('/' + selectedMode)
    }, [])

    return (
      <Header
        theme="dark"
        style={{
          overflow: 'auto',
          width: '100vw',
          position: 'fixed',
          left: 0,
          top: 0,
          right: 0,
        }}>
        <div className="demo-logo"/>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
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