import { Layout, theme, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {setAutosName, setAutosParameters} from '../store/modules/editor/model';
import Declaration from './Declaration';
import Model from './Model';
const { Header, Content } = Layout
function Template() {
    const dispatch = useDispatch()
    const {selectedMenuItem} = useSelector(state=>state.bar)
    const {name,parameters,declaration} = useSelector(state=>state.model.autos[0])
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Header style={{ background: colorBgContainer }}>
                名字 :<Input style={{ width: '10%', margin: '12px' }} value={name} 
                onChange={(e) =>{dispatch(setAutosName(e.target.value))}} />
                参数 :<Input style={{ width: '20%', margin: '12px' }} value={parameters}
                onChange={(e) =>{dispatch(setAutosParameters(e.target.value))}}/>
            </Header>
            <Content
                style={{
                    margin: '24px 16px',
                    position:'relative',
                    // width:'1390px',
                    minHeight: '500px',
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                {selectedMenuItem==='model'?<Model/>:
                <Declaration type={selectedMenuItem} declaration={declaration}/>}
                
            </Content>
        </Layout>

    )

}

export default Template


