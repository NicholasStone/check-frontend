import Draggable from "react-draggable"
import IconFont from "../utils/IconFont"
import { useSelector } from "react-redux"
function Location(props){
    const {selectedTool} = useSelector(state=>state.bar)
    const {location,init} = props
    return(
        <>
        {/* name */}
        <Draggable onStart={()=>selectedTool==='select'}>
            <text x={location.x-6} y={location.y-12}>{location.name}</text>
        </Draggable>
        {/* location */}
        <Draggable onStart={()=>selectedTool==='select'}>
            <use x={location.x-12} y={location.y-12} width={24} height={24} xlinkHref={init?"#icon-circle-start":"#icon-circle"}></use>
        </Draggable>
        {/* invariant */}
        <Draggable onStart={()=>selectedTool==='select'}>
            <text x={location.x-6} y={location.y+12} fill="#DA70D6">{location.invariant}</text>
        </Draggable>
        </>
    )
}

export default Location