import { Button, Drawer } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Location from "./Location"
import Transition from "./Transition"
import { setAutosLocations } from "../store/modules/editor/model"
function Model(){
    const dispatch = useDispatch()
    const {selectedTool} = useSelector(state=>state.bar)
    const {autos} = useSelector(state=>state.model)
    const [open, setOpen] = useState(true);
    const [model,setModel] = useState([]);
    function initModel(){
        console.log(autos[0].locations);
        console.log(autos[0].transitions);
        const tmpLocations = autos[0].locations.map(location=><Location key={location.id} location={location} init={location.id===autos[0].init}/>)
        const tmpTransitions = autos[0].transitions.map(transition=><Transition key={transition.id} transition={transition}/>)
        setModel([...tmpLocations,tmpTransitions])
    }

    useEffect(() => {
        initModel()
    }, [])

    function addLocation(x1,y1){
      const locations = autos[0].locations
      const location = {
        id:locations[locations.length-1].id+1,
        name:'',
        x:x1,
        y:y1
      }
      console.log(location);
      setModel([...model,<Location key={location.id} init={false} location={location}/>])
      dispatch(setAutosLocations([...locations,location]))
      console.log(model);
    }

    return(
        <svg style={{width:'100%', height:'500px'}} onClick={(e)=>{if(selectedTool==='location') addLocation(e.clientX-e.target.getBoundingClientRect().left,e.clientY-e.target.getBoundingClientRect().top)}}
         >
          <script src="https://at.alicdn.com/t/c/font_4447395_prlpotdyeh.js"/>
            {model}
            {/* <Transition x1={275} y1={230} x2={500} y2={230} guard={} update={}/> */}
            {/* <Transition x1={500} y1={240} x2={275} y2={240} guard="test" update="test2"/>
            <Location/> */}
            {/* <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={()=>setOpen(false)}
        open={open}
        getContainer={false}
      >
        <p>Some contents...</p>
      </Drawer> */}
        </svg>
        
        
    )
}

export default Model