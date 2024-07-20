import {Layout, Menu} from 'antd';
// import { useState } from 'react';
import IconFont from '../../utils/IconFont';
import Template from '../../components/Template';
import {useDispatch, useSelector} from 'react-redux';
import Declaration from '../../components/Declaration';
import {setSelectedMenuItem} from '../../store/modules/editor/bar';

const {Sider, Content} = Layout

function EditorPanel() {
  const dispatch = useDispatch()
  const {declaration, autos, systemDeclaration} = useSelector(state => state.model)
  const {selectedMenuItem} = useSelector(state => state.bar)
  return (
    <Layout style={{padding: '5px', minWidth: '800px'}}>
      <Sider theme='light'>
        <Menu
          mode="inline"
          defaultSelectedKeys={[selectedMenuItem]}
          items={[
            {
              key: 'global_declaration',
              icon: <IconFont type='icon-paper'/>,
              label: '声明',
            },
            {
              icon: <IconFont type='icon-clock'/>,
              label: autos[0].name,
              children: [
                {
                  key: 'model',
                  icon: <IconFont type='icon-paper'/>,
                  label: '模型',
                },
                {
                  key: 'local_declaration',
                  icon: <IconFont type='icon-paper'/>,
                  label: '声明',
                }
              ]
            },
            {
              key: 'system_declaration',
              icon: <IconFont type='icon-paper'/>,
              label: '模型声明',
            },
          ]}
          onClick={(e) => {
            dispatch(setSelectedMenuItem(e.key))
            console.log(e)
          }}
        />
      </Sider>
      <Content style={{padding: '5px', minWidth: '800px'}}>
        {selectedMenuItem === "global_declaration" && <Declaration type={selectedMenuItem} declaration={declaration}/>}
        {(selectedMenuItem === "model" || selectedMenuItem === "local_declaration") && <Template/>}
        {selectedMenuItem === "system_declaration" &&
          <Declaration type={selectedMenuItem} declaration={systemDeclaration}/>}

      </Content>

    </Layout>
  )
}

export default EditorPanel