import { Button, Drawer,Input } from "antd"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocationOpen, setOpenLocation } from "../store/modules/editor/drawer";
import { deleteAutosLocation, updateAutosLocation } from "../store/modules/editor/model";

function LocationEditor(){
    const dispatch = useDispatch()
    const {locationOpen,openLocation} = useSelector(state=>state.drawer)
    function updateContent(type,content){
        let tmp
        switch(type){
            case 'name':{
                tmp = {...openLocation,name:{...openLocation.name,content:content}}
                break
            }
            case 'invariant':{
                tmp = {...openLocation,invariant:{...openLocation.invariant,content:content}}
                break
            }
        }
        //update store
        dispatch(setOpenLocation(tmp))
        //an encapsulated method
        dispatch(updateAutosLocation(tmp))
    }
    function deleteLocation(){
        dispatch(deleteAutosLocation(openLocation.id))
        dispatch(setLocationOpen(false))
    }
    return (
        <Drawer
        title="编辑location"
        placement="right"
        closable={false}
        onClose={()=>dispatch(setLocationOpen(false))}
        open={locationOpen}
        getContainer={false}
        autoFocus={false}
      >
        名字：<Input style={{ width: '70%', margin: '12px' }} value={openLocation.name.content} 
        onChange={(e)=>{updateContent('name',e.target.value)}}/><br/>

        Invariant:<Input style={{ width: '70%', margin: '12px' }} value={openLocation.invariant.content}
        onChange={(e)=>{updateContent('invariant',e.target.value)}}/><br/>

        <br /><Button onClick={deleteLocation}>删除location</Button>
        
</Drawer>
    )
}

export default LocationEditor