import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Location from "./Location"
import Transition from "./Transition"
import { addAutosLocation, addAutosTransition } from "../store/modules/editor/model"
import LocationEditor from "./LocationEditor"
import TransitionEditor from "./TransitionEditor"
function Model(){
    const dispatch = useDispatch()
    const {selectedTool} = useSelector(state=>state.bar)
    const {locations,transitions,init} = useSelector(state=>state.model.autos[0])
    //source&target location id
    let clickedLocation = []
    //points of clicked locations
    let points = []
    
    //view model
    function updateModel(){
      console.log(locations,transitions);
        const tmpLocations = locations.map(location=><Location key={location.id} location={location} init={location.id===init}/>)
        const tmpTransitions = transitions.map(transition=><Transition key={transition.id} transition={transition}/>)
        return [...tmpLocations,tmpTransitions]
    }

    function addLocation(x1,y1){
      const location = {
        id:locations[locations.length-1].id+1,
        name:{
          content:'',
          x:x1,
          y:y1
        },
        invariant:{
          content:'',
          x:x1,
          y:y1
        },
        x:x1,
        y:y1
      }

      //update model
      dispatch(addAutosLocation(location))
      console.log(locations);
    }

    function addTransition(){
      console.log(clickedLocation);
      console.log(points);
      const sourceLocation = locations.find(location=>location.id===clickedLocation[0])
      const targetLocation = locations.find(location=>location.id===clickedLocation[1])
      console.log(sourceLocation,targetLocation);
      const transition = {
        id:transitions[transitions.length-1].id+1,
        sourceId:sourceLocation.id,
        targetId:targetLocation.id,
        nails:points,
        select:{
          content:'',
          x:sourceLocation.x,
          y:sourceLocation.y
        },
        guard:{
          content:'',
          x:sourceLocation.x,
          y:sourceLocation.y
        },
        sync:{
          content:'',
          x:targetLocation.x,
          y:targetLocation.y
        },
        update:{
          content:'',
          x:targetLocation.x,
          y:targetLocation.y
        },

      }

      //update model
      dispatch(addAutosTransition(transition))
    }

    return(
      <>
        <svg 
        style={{width:'100%', height:'500px'}} 
        onClick={
          (e)=>{
            if(selectedTool==='location'){
              addLocation(e.clientX-e.target.getBoundingClientRect().left,e.clientY-e.target.getBoundingClientRect().top)
            }
            else if(selectedTool==='edge'){
              //click location
              if(e.target.getAttribute('class')!==null&&e.target.getAttribute('class').includes('circle')){
                clickedLocation.push(parseInt(e.target.getAttribute('id')))
                //add transition
                if(clickedLocation.length===2){
                  addTransition()
                  clickedLocation = []
                  points = []
                }
              }
              //click other places
              else{
                const xOffset = e.target.getBoundingClientRect().left
                const yOffset = e.target.getBoundingClientRect().top
                //save the x,y only when one location already clicked
                if(clickedLocation.length===1){
                  points.push({x:e.clientX-xOffset,y:e.clientY-yOffset})
                }
              }
              console.log("clicked");
              console.log(clickedLocation.length);
            }

            }
        }
         >
          <script src="https://at.alicdn.com/t/c/font_4447395_prlpotdyeh.js"/>
            {updateModel()}
            {/* <Transition x1={275} y1={230} x2={500} y2={230} guard={} update={}/> */}
            {/* <Transition x1={500} y1={240} x2={275} y2={240} guard="test" update="test2"/>
            <Location/> */}
        </svg>
        <LocationEditor/>
        <TransitionEditor/>
      </>
    )
}

export default Model