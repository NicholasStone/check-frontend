import {Button, ConfigProvider, Divider, Tooltip} from "antd"
import IconFont from "../utils/IconFont"
import {useDispatch, useSelector} from "react-redux"
import {useRef} from "react"
import {setSelectedTool, setZoom} from "../store/modules/editor/bar"
import {setAutos, setDeclaration, setSystemDeclaration} from "../store/modules/editor/model"

function Toolbar() {
  const dispatch = useDispatch()
  const toolBtnRef = useRef(null)
  const fileInputRef = useRef(null);
  const {selectedMode, selectedTool, zoom} = useSelector(state => state.bar)
  const {declaration, autos, systemDeclaration} = useSelector(state => state.model)
  const onToolPress = () => {
    const id = toolBtnRef.current.id
    const tool = id.split("Btn")[0]
    dispatch(setSelectedTool(tool))
    console.log(selectedTool);
  }
  const onSaveClicked = () => {
    const jsonData = {
      declaration: declaration,
      automatons: autos,
      system_declaration: systemDeclaration
    };

    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], {type: 'application/json'});

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      const anchor = document.createElement('a');
      anchor.href = dataUrl;
      anchor.download = 'model.json';
      anchor.click();
    };

    reader.readAsDataURL(blob);
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        console.log(event.target.result);
        const jsonData = JSON.parse(event.target.result)
        console.log('Imported JSON data:', jsonData);
        // const {declaration,autos,systemDeclaration} = jsonData
        dispatch(setDeclaration(jsonData.declaration))
        dispatch(setSystemDeclaration(jsonData.system_declaration))
        let tmpAutos = jsonData.automatons
        console.log(tmpAutos[0].locations[0], "before transform");
        if (tmpAutos[0].locations[0].x === undefined) {
          transformAutos(tmpAutos)
        }
        console.log(tmpAutos, "after transform");
        // dispatch(setDeclaration(declaration))
        dispatch(setAutos(tmpAutos))
        // dispatch(setSystemDeclaration(systemDeclaration))
      };
      reader.readAsText(file);
    }
  }

  const handleZoomIn = () => {
    document.body.style.zoom = zoom + 0.1
    dispatch(setZoom(zoom + 0.1))
  }

  const handleZoomOut = () => {
    document.body.style.zoom = zoom - 0.1
    dispatch(setZoom(zoom - 0.1))
  }

  const handleZoomFit = () => {
    document.body.style.zoom = 1
    dispatch(setZoom(1))
  }

  const transformAutos = (autos) => {
    autos[0].locations = autos[0].locations.map((location) => {
      //add geo
      location.x = 100
      location.y = 100
      //transform name&invariant
      const tmpName = {content: location.name, x: 100, y: 100}
      location.name = tmpName
      const invariant = {content: location.invariant, x: 100, y: 100}
      location.invariant = invariant
      return location
    })
    autos[0].transitions = autos[0].transitions.map((transition) => {
      //change property name
      transition.sourceId = transition.source_id
      transition.targetId = transition.target_id
      delete transition.source_id
      delete transition.target_id
      //add nails
      transition.nails = []
      //transform select guard sync update
      const tmpSelect = {content: transition.select, x: 100, y: 100}
      transition.select = tmpSelect
      const tmpGuard = {content: transition.guard, x: 100, y: 100}
      transition.guard = tmpGuard
      const tmpSync = {content: transition.sync, x: 100, y: 100}
      transition.sync = tmpSync
      const tmpUpdate = {content: transition.update, x: 100, y: 100}
      transition.update = tmpUpdate
      return transition
    })
  }
  return (
    <div style={{padding: '12px'}}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        style={{display: 'none'}}
      />
      <ConfigProvider
        theme={{
          components: {
            Divider: {
              verticalMarginInline: 1
            },
          },
        }}
      >
        {/* first group*/}
        <ConfigProvider>
          <Tooltip title="新建">
            <Button id="createBtn" type="text" icon={<IconFont type="icon-create"/>}></Button>
          </Tooltip>
          <Tooltip title={<span>新建</span>}>
            <Button id="createBtn" type="text" icon={<IconFont type="icon-create"/>}></Button>
          </Tooltip>
          <Tooltip title={<span>打开</span>}>
            <Button id="openBtn" type="text" icon={<IconFont type="icon-open-copy"/>}
                    onClick={() => fileInputRef.current.click()}></Button>
          </Tooltip>
          <Tooltip title={<span>保存</span>}>
            <Button id="saveBtn" type="text" icon={<IconFont type="icon-save-copy"/>}
                    onClick={onSaveClicked}></Button>
          </Tooltip>
          <Divider style={{backgroundColor: 'black'}} type="vertical"/>
        </ConfigProvider>

        {/* second group*/}
        <ConfigProvider componentDisabled={selectedMode !== 'editor' && selectedMode !== 'lustre'}>
          <Tooltip title={<span>撤销上次动作</span>}>
            <Button id="retrieveBtn" type="text" icon={<IconFont type="icon-back-arrow"/>}></Button>
          </Tooltip>
          <Tooltip title={<span>重做上次动作</span>}>
            <Button id="redoBtn" type="text" icon={<IconFont type="icon-forward-arrow"/>}></Button>
          </Tooltip>
          <Divider style={{backgroundColor: 'black'}} type="vertical"/>
          <Tooltip title={<span>适合窗口</span>}>
            <Button id="zoomFitBtn" type="text" icon={<IconFont type="icon-zoom-fit"/>}
                    onClick={handleZoomFit}></Button>
          </Tooltip>
        </ConfigProvider>


        {/* third group */}
        <ConfigProvider componentDisabled={selectedMode === 'verifier' ? true : false}>
          <Tooltip title={<span>放大</span>}>
            <Button id="zoomInBtn" type="text" icon={<IconFont type="icon-zoom-in"/>}
                    onClick={handleZoomIn}></Button>
          </Tooltip>
          <Tooltip title={<span>缩小</span>}>
            <Button id="zoomOutBtn" type="text" icon={<IconFont type="icon-zoom-out"/>}
                    onClick={handleZoomOut}></Button>
          </Tooltip>
        </ConfigProvider>


        {/* fourth group */}
        <ConfigProvider componentDisabled={selectedMode === 'editor' ? false : true}>
          <Divider style={{backgroundColor: 'black'}} type="vertical"/>
          <Tooltip title={<span>选择工具</span>}>
            <Button ref={toolBtnRef} id="selectBtn" type={selectedTool === "select" ? "primary" : "text"}
                    icon={<IconFont type="icon-select"/>} onClick={onToolPress}/>
          </Tooltip>
          <Tooltip title={<span>添加Location</span>}>
            <Button ref={toolBtnRef} id="locationBtn" type={selectedTool === "location" ? "primary" : "text"}
                    icon={<IconFont type="icon-circle"/>} onClick={onToolPress}/>
          </Tooltip>
          <Tooltip title={<span>添加Branch</span>}>
            <Button ref={toolBtnRef} id="branchBtn" type={selectedTool === "branch" ? "primary" : "text"}
                    icon={<IconFont type="icon-branch"/>} onClick={onToolPress}/>
          </Tooltip>
          <Tooltip title={<span>添加Edge</span>}>
            <Button ref={toolBtnRef} id="edgeBtn" type={selectedTool === "edge" ? "primary" : "text"}
                    icon={<IconFont type="icon-arrow-right-full"/>} onClick={onToolPress}/>
          </Tooltip>
          <Tooltip title={<span>添加Nail</span>}>
            <Button ref={toolBtnRef} id="nailBtn" type={selectedTool === "nail" ? "primary" : "text"}
                    icon={<IconFont type="icon-nail"/>} onClick={onToolPress}/>
          </Tooltip>

          <Divider style={{backgroundColor: 'black'}} type="vertical"/>
          <Divider style={{backgroundColor: 'black'}} type="vertical"/>
        </ConfigProvider>

      </ConfigProvider>


    </div>
  )
}

export default Toolbar