import {Flex, Layout, Menu} from 'antd';
// import { useState } from 'react';
import IconFont from '@/utils/IconFont';
import Template from '@/components/Template';
import {useDispatch, useSelector} from 'react-redux';
import Declaration from '@/components/Declaration';
import {setSelectedMenuItem} from '@/store/modules/editor/bar';
import Toolbar from '@/components/Toolbar'


const {Sider, Content} = Layout

function EditorPanel() {
  const dispatch = useDispatch()
  const {declaration, autos, systemDeclaration} = useSelector(state => state.model)
  const {selectedMenuItem} = useSelector(state => state.bar)
  return (
    <Layout style={{padding: '5px', minWidth: '800px'}}>
      <Flex vertical>
        <Toolbar/>
        <Flex>
          <Sider theme='light'>
          <Menu
            mode="inline"
            defaultSelectedKeys={[selectedMenuItem]}
            items={[
              {
                key: 'global_declaration',
                icon: <IconFont type='icon-paper'/>,
                label: '全局声明',
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
                    label: '局部声明',
                  }
                ]
              },
              {
                key: 'system_declaration',
                icon: <IconFont type='icon-paper'/>,
                label: '模型实例',
              },
            ]}
            onClick={(e) => {
              dispatch(setSelectedMenuItem(e.key))
              console.log(e)
            }}
          />
          </Sider>
          <Content style={{padding: '3px', minWidth: '1200px'}}>
            {selectedMenuItem === "global_declaration" && <Declaration type={selectedMenuItem} declaration={declaration}/>}
            {(selectedMenuItem === "model" || selectedMenuItem === "local_declaration") && <Template/>}
            {selectedMenuItem === "system_declaration" &&
              <Declaration type={selectedMenuItem} declaration={systemDeclaration}/>}
          </Content>
        </Flex>

      </Flex>
      
    </Layout>
  )
}

export default EditorPanel