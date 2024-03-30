import Draggable from "react-draggable"
import { useDispatch, useSelector } from "react-redux"
import { setLocationOpen, setOpenLocation } from "../store/modules/editor/drawer"
import { useRef } from "react"
import { updateAutosLocation } from "../store/modules/editor/model"

function Location(props){
    const dispatch = useDispatch()
    const nameRef = useRef(null)
    const locationRef = useRef(null)
    const invariantRef = useRef(null)
    const {selectedTool} = useSelector(state=>state.bar)
    const {location,init} = props

    function getOffset(ref){
        const match = ref.current.getAttribute('transform').match(/translate\(([^,]+),\s*([^)]+)\)/)
        const x = parseInt(match[1])
        const y = parseInt(match[2])
        return [x,y]
    }
    function afterLocationDrag(){
        const tmp = getOffset(locationRef)
        dispatch(updateAutosLocation({...location,x:location.x+tmp[0],y:location.y+tmp[1]}))
    }
    function afterNameDrag(){
        const tmp = getOffset(nameRef)
        dispatch(updateAutosLocation({...location,name:{...location.name,x:location.name.x+tmp[0],y:location.name.y+tmp[1]}}))
    }
    function afterInvariantDrag(){
        const tmp = getOffset(invariantRef)
        dispatch(updateAutosLocation({...location,invariant:{...location.invariant,x:location.invariant.x+tmp[0],y:location.invariant.y+tmp[1]}}))
    }
    return(
        <>
        {/* name */}
        <Draggable onStart={()=>selectedTool==='select'} onStop={afterNameDrag} position={{x:0,y:0}}>
            <text ref={nameRef} x={location.name.x} y={location.name.y}>{location.name.content}</text>
        </Draggable>
        {/* location */}
        <Draggable onStart={()=>selectedTool==='select'} onStop={afterLocationDrag} position={{x:0,y:0}}>
            <use ref={locationRef} id={location.id} className='circle' x={location.x-12} y={location.y-12} width={24} height={24} xlinkHref={init?"#icon-circle-start":"#icon-circle"} 
            onDoubleClick={()=>{
                if(selectedTool==='select'){
                dispatch(setOpenLocation(location))
                dispatch(setLocationOpen(true))
                }
            }}
            >
            </use>
        </Draggable>
        {/* invariant */}
        <Draggable onStart={()=>selectedTool==='select'} onStop={afterInvariantDrag} position={{x:0,y:0}}>
            <text ref={invariantRef} x={location.invariant.x} y={location.invariant.y} fill="#DA70D6">{location.invariant.content}</text>
        </Draggable>
        </>
    )
}

export default Location