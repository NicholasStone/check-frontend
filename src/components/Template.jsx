import {Button, Input, Layout, notification, theme} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {setAutosName, setAutosParameters, setId} from '../store/modules/editor/model';
import Declaration from './Declaration';
import Model from './Model';
import {request} from '../utils/request';

const {Header, Content} = Layout

function Template() {
  const dispatch = useDispatch()
  const {selectedMenuItem} = useSelector(state => state.bar)
  const model = useSelector(state => state.model)
  const {name, parameters, init, declaration, locations, transitions} = useSelector(state => state.model.autos[0])
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();
  const [api, contextHolder] = notification.useNotification();

  function removeAutosGeo() {
    let newAutos = [{name: name, parameters: parameters, init: init, declaration: declaration}]
    newAutos[0].locations = locations.map((location) => {
      let newLocation = {id: location.id, name: location.name.content, invariant: location.invariant.content}
      return newLocation
    })
    newAutos[0].transitions = transitions.map((transition) => {
      let newTransition = {
        id: transition.id, source_id: transition.sourceId, target_id: transition.targetId,
        select: transition.select.content, guard: transition.guard.content,
        sync: transition.sync.content, update: transition.update.content
      }
      return newTransition
    })
    return newAutos
  }

  async function uploadModel() {
    const file = {
      declaration: model.declaration,
      automatons: removeAutosGeo(),
      system_declaration: model.systemDeclaration
    };
    console.log(file);
    const body = {file: JSON.stringify(file)}
    console.log(body);
    const res = await request.post('/model/convert', body)
    if (res.code === 200) {
      dispatch(setId(res.data.id))
      api.success({
        message: "上传结果",
        description: "上传成功",
        duration: 5,
      });
    } else {
      api.error({
        message: "上传结果",
        description: res.message,
        duration: 5,
      });
    }
  }

  return (
    <Layout>
      {contextHolder}
      <Header style={{background: colorBgContainer}}>
        名字 :<Input style={{width: '10%', margin: '12px'}} value={name}
                     onChange={(e) => {
                       dispatch(setAutosName(e.target.value))
                     }}/>
        参数 :<Input style={{width: '20%', margin: '12px'}} value={parameters}
                     onChange={(e) => {
                       dispatch(setAutosParameters(e.target.value))
                     }}/>
        <Button size="middle" style={{float: 'right', margin: '16px'}} onClick={uploadModel}>上传模型</Button>
      </Header>
      <Content
        style={{
          margin: '24px 16px',
          position: 'relative',
          minWidth: '1100px',
          minHeight: '500px',
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {selectedMenuItem === 'model' ? <Model/> :
          <Declaration type={selectedMenuItem} declaration={declaration}/>}

      </Content>
    </Layout>

  )

}

export default Template


