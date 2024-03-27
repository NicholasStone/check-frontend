import Draggable from "react-draggable"
import IconFont from "../utils/IconFont"
import { useDispatch, useSelector } from "react-redux"
import { setLocationOpen, setOpenLocation } from "../store/modules/editor/drawer"

function Location(props){
    const dispatch = useDispatch()
    const {selectedTool} = useSelector(state=>state.bar)
    const {location,init} = props
    return(
        <>
        {/* name */}
        <Draggable onStart={()=>selectedTool==='select'}>
            <text x={location.x-6} y={location.y-12}>{location.name.content}</text>
        </Draggable>
        {/* location */}
        <Draggable onStart={()=>selectedTool==='select'}>
            <use id={location.id} className='circle' x={location.x-12} y={location.y-12} width={24} height={24} xlinkHref={init?"#icon-circle-start":"#icon-circle"} 
            onDoubleClick={(e)=>{
                dispatch(setOpenLocation(location))
                dispatch(setLocationOpen(true))
            }}>

            </use>
        </Draggable>
        {/* invariant */}
        <Draggable onStart={()=>selectedTool==='select'}>
            <text x={location.x-6} y={location.y+12} fill="#DA70D6">{location.invariant.content}</text>
        </Draggable>
        </>
    )
}

export default Location