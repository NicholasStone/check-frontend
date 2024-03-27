import { Drawer,Input } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { setLocationOpen, setOpenTransition, setTransitionOpen } from "../store/modules/editor/drawer";
import { updateAutosTransition } from "../store/modules/editor/model";

function TransitionEditor(){
    const dispatch = useDispatch()
    const {transitionOpen,openTransition} = useSelector(state=>state.drawer)
    function updateContent(type,content){
        let tmp
        switch(type){
            case 'select':{
                tmp = {...openTransition,select:{...openTransition.select,content:content}}
                break
            }
            case 'guard':{
                tmp = {...openTransition,guard:{...openTransition.guard,content:content}}
                break
            }
            case 'sync':{
                tmp = {...openTransition,sync:{...openTransition.sync,content:content}}
                break
            }
            case 'update':{
                tmp = {...openTransition,update:{...openTransition.update,content:content}}
                break
            }
        }
        //update store
        dispatch(setOpenTransition(tmp))
        //an encapsulated method
        dispatch(updateAutosTransition(tmp))
    }
    return (
        <Drawer
        title="编辑transition"
        placement="right"
        closable={false}
        onClose={()=>dispatch(setTransitionOpen(false))}
        open={transitionOpen}
        getContainer={false}
        autoFocus={false}
      >
        Select:<Input style={{ width: '70%', margin: '12px' }} value={openTransition.select.content}
        onChange={(e)=>{updateContent('select',e.target.value)}}/><br/>
        Guard:<Input style={{ width: '70%', margin: '12px' }} value={openTransition.guard.content}
        onChange={(e)=>{updateContent('guard',e.target.value)}}/><br/>
        Sync:<Input style={{ width: '70%', margin: '12px' }} value={openTransition.sync.content}
        onChange={(e)=>{updateContent('sync',e.target.value)}}/><br/>
        Update:<Input style={{ width: '70%', margin: '12px' }} value={openTransition.update.content} 
        onChange={(e)=>{updateContent('update',e.target.value)}}/><br/>
        
</Drawer>
    )
}

export default TransitionEditor