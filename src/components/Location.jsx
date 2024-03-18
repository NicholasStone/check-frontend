import Draggable from "react-draggable"
import IconFont from "../utils/IconFont"
import { useSelector } from "react-redux"
function Location(props){
    const {selectedTool} = useSelector(state=>state.bar)
    return(
        <Draggable onStart={()=>selectedTool==='select'} bounds='parent'>
            <div style={{width:'24px', position:'absolute', left:props.location.x, top:props.location.y}}>
                {props.location.name}
               <IconFont type={props.init?"icon-circle-start":"icon-circle"} 
                    style={{
                        fontSize:'24px',
                        // position:'relative',
                    }}/>
             </div> 
        </Draggable>
    )
}

export default Location