import { Button, Drawer } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Location from "./Location"
import Edge from "./Edge"
import { setAutosLocations } from "../store/modules/editor/model"
function Model(){
    const dispatch = useDispatch()
    const {selectedTool} = useSelector(state=>state.bar)
    const {autos} = useSelector(state=>state.model)
    const [open, setOpen] = useState(true);
    const [model,setModel] = useState([]);
    function updateModel(){
        console.log(autos[0].locations);
        setModel(autos[0].locations.map(location=><Location key={location.id} location={location} init={location.id===autos[0].init}/>))
    }
    useEffect(() => {
        updateModel()
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
        <div style={{width:'100%', height:'500px', position:'relative'}} onClick={(e)=>{if(selectedTool==='location') addLocation(e.clientX-e.target.getBoundingClientRect().left,e.clientY-e.target.getBoundingClientRect().top)}}>
            {model}
            <Edge x1={275} y1={230} x2={500} y2={230}/>
            <Edge x1={500} y1={240} x2={275} y2={240}/>
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
        </div>
        
        
    )
}

export default Model