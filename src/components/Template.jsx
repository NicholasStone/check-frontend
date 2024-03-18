import { Layout, theme, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {setAutosName} from '../store/modules/editor/model';
import Declaration from './Declaration';
import Model from './Model';
const { Header, Content } = Layout
function Template() {
    const dispatch = useDispatch()
    const {selectedMenuItem} = useSelector(state=>state.bar)
    const {autos} = useSelector(state=>state.model)
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Header style={{ background: colorBgContainer }}>
                名字 :<Input style={{ width: '10%', margin: '12px' }} defaultValue={autos[0].name} onChange={(e) =>{
                    dispatch(setAutosName(e.target.value))
                    console.log(e.target.value);
                    console.log(autos);
                    }} />
                参数 :<Input style={{ width: '20%', margin: '12px' }} />
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
                <Declaration type={selectedMenuItem} declaration={autos[0].declaration}/>}
                
            </Content>
        </Layout>

    )

}

export default Template


