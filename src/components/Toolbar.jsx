import { Button, ConfigProvider, Divider, Tooltip } from "antd"
import IconFont from "../utils/IconFont"
import { useDispatch, useSelector } from "react-redux"
import { useRef } from "react"
import { setSelectedTool } from "../store/modules/editor/bar"
import { setAutos, setDeclaration, setSystemDeclaration } from "../store/modules/editor/model"
function Toolbar() {
    const dispatch = useDispatch()
    const toolBtnRef = useRef(null)
    const fileInputRef = useRef(null);
    const { selectedMode,selectedTool } = useSelector(state => state.bar)
    const {declaration,autos,systemDeclaration} = useSelector(state=>state.model)
    const onToolPress = () => {
        const id = toolBtnRef.current.id
        const tool = id.split("Btn")[0]
        dispatch(setSelectedTool(tool))
        console.log(selectedTool);
    }
    const onSaveClicked = ()=>{
        const jsonData = {
            declaration: declaration,
            autos: autos,
            systemDeclaration: systemDeclaration
          };
      
          const jsonString = JSON.stringify(jsonData, null, 2);
          const blob = new Blob([jsonString], { type: 'application/json' });
      
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

    const handleFileInputChange = (event)=>{
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const jsonData = JSON.parse(event.target.result)
                // console.log('Imported JSON data:', jsonData);
                const {declaration,autos,systemDeclaration} = jsonData
                dispatch(setDeclaration(declaration))
                dispatch(setAutos(autos))
                dispatch(setSystemDeclaration(systemDeclaration))
            };
            reader.readAsText(file);
        }
    }
    return (
        <div style={{ padding: '12px' }}>
            <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
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
                {/* 第一组 */}
                <ConfigProvider>
                    <Tooltip title={<span>新建</span>}>
                    <Button id="zoomInBtn" type="text" icon={<IconFont type="icon-create" />}></Button>
                    </Tooltip>
                    <Tooltip title={<span>打开</span>}>
                        <Button id="zoomInBtn" type="text" icon={<IconFont type="icon-open-copy" />} onClick={() => fileInputRef.current.click()}></Button>
                    </Tooltip>
                    <Tooltip title={<span>保存</span>}>
                        <Button id="zoomInBtn" type="text" icon={<IconFont type="icon-save-copy" />} onClick={onSaveClicked}></Button>
                    </Tooltip>
                    <Divider style={{ backgroundColor: 'black' }} type="vertical" />
                </ConfigProvider>

                {/* 第二组 */}
                <ConfigProvider componentDisabled={selectedMode==='editor'?false:true}>
                    <Tooltip title={<span>撤销上次动作</span>}>
                    <Button id="zoomInBtn" type="text" icon={<IconFont type="icon-back-arrow" />}></Button>
                    </Tooltip>
                    <Tooltip title={<span>重做上次动作</span>}>
                        <Button id="zoomInBtn" type="text" icon={<IconFont type="icon-forward-arrow" />}></Button>
                    </Tooltip>
                    <Divider style={{ backgroundColor: 'black' }} type="vertical" />
                    <Tooltip title={<span>适合窗口</span>}>
                        <Button id="zoomInBtn" type="text" icon={<IconFont type="icon-zoom-fit" />}></Button>
                    </Tooltip>
                </ConfigProvider>

                
                {/* 第三组 */}
                <ConfigProvider componentDisabled={selectedMode==='verifier'?true:false}>
                    <Tooltip title={<span>放大</span>}>
                    <Button id="zoomInBtn" type="text" icon={<IconFont type="icon-zoom-in" />}></Button>
                    </Tooltip>
                    <Tooltip title={<span>缩小</span>}>
                        <Button id="zoomOutBtn" type="text" icon={<IconFont type="icon-zoom-out" />}></Button>
                    </Tooltip>
                </ConfigProvider>
                

                {/* 第四组 */}
                <ConfigProvider componentDisabled={selectedMode==='editor'?false:true}>
                    <Divider style={{ backgroundColor: 'black' }} type="vertical" />
                    <Tooltip title={<span>选择工具</span>}>
                        <Button ref={toolBtnRef} id="selectBtn" type={selectedTool === "select" ? "primary" : "text"} icon={<IconFont type="icon-select" />} onClick={onToolPress} />
                    </Tooltip>
                    <Tooltip title={<span>添加Location</span>}>
                        <Button ref={toolBtnRef} id="locationBtn" type={selectedTool === "location" ? "primary" : "text"} icon={<IconFont type="icon-circle" />} onClick={onToolPress} />
                    </Tooltip>
                    <Tooltip title={<span>添加Branch</span>}>
                        <Button ref={toolBtnRef} id="branchBtn" type={selectedTool === "branch" ? "primary" : "text"} icon={<IconFont type="icon-branch" />} onClick={onToolPress} />
                    </Tooltip>
                    <Tooltip title={<span>添加Edge</span>}>
                        <Button ref={toolBtnRef} id="edgeBtn" type={selectedTool === "edge" ? "primary" : "text"} icon={<IconFont type="icon-arrow-right-full" />} onClick={onToolPress} />
                    </Tooltip>
                    <Tooltip title={<span>添加Nail</span>}>
                        <Button ref={toolBtnRef} id="nailBtn" type={selectedTool === "nail" ? "primary" : "text"} icon={<IconFont type="icon-nail" />} onClick={onToolPress} />
                    </Tooltip>

                    <Divider style={{ backgroundColor: 'black' }} type="vertical" />
                    <Divider style={{ backgroundColor: 'black' }} type="vertical" />
                </ConfigProvider>
                
            </ConfigProvider>





        </div>
    )
}
export default Toolbar