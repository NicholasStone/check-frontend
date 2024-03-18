import { Button, Drawer } from "antd"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Location from "./Location"
import Edge from "./Edge"

function Model(){
    const {selectedTool} = useSelector(state=>state.bar)
    const {autos} = useSelector(state=>state.model)
    const [open, setOpen] = useState(true);
    function initModel(){
        console.log(autos[0].locations);
        return autos[0].locations.map(location=><Location key={location.id} location={location} init={location.id===autos[0].init}/>)
    }
    // useEffect(() => {
    //     initModel()
    // }, [])

    return(
        <div style={{width:'100%', height:'500px', position:'relative'}}>
            {initModel()}
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