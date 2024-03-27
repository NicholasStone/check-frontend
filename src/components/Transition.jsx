import React from 'react';
import Draggable from 'react-draggable';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenTransition, setTransitionOpen } from '../store/modules/editor/drawer';

const Transition = (props) => {
  const dispatch = useDispatch()
  const {transition} = props
  const {selectedTool} = useSelector(state=>state.bar)
  const {locations} = useSelector(state=>state.model.autos[0])
  const locationPairs = findLocationPairs(locations)
  const points = createPoints(); 
  function findLocationPairs(locations){
    const sourceLocation = locations.find(location=>location.id===transition.sourceId)
    const targetLocation = locations.find(location=>location.id===transition.targetId)
    return [sourceLocation,targetLocation]
  }
  function createPoints(){
    const r=12
    const x1=locationPairs[0].x,y1=locationPairs[0].y
    const x2=locationPairs[1].x,y2=locationPairs[1].y
    const xDir = x2-x1>0?1:-1
    const yDir = y2-y1>0?1:-1
    const angle = x1===x2?Math.PI/2:Math.atan((y2-y1)/(x2-x1))
    const xOffset = Math.abs(Math.cos(angle)*r);
    const yOffset = Math.abs(Math.sin(angle)*r);
    const arr = [locationPairs[0].x+xDir*xOffset,locationPairs[0].y+yDir*yOffset]
    for(let nail of transition.nails){
      arr.push(nail.x,nail.y)
    }
    arr.push(locationPairs[1].x-xDir*xOffset,locationPairs[1].y-yDir*yOffset)
    return arr;
  }
  return (
      <>
        <defs>
        <marker
          id="arrow"
          markerWidth="6"
          markerHeight="6"
          refX="6"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polyline points="0,0 6,3 0,6" fill="none" stroke="#000" strokeWidth="1" />
        </marker>
        </defs>
        {/* select */}
        <Draggable onStart={()=>selectedTool==='select'}>
        <text x={transition.select.x} y={transition.select.y} fill='#FFCC00' textAnchor='start'>{transition.select.content}</text>
        </Draggable>
        {/* guard */}
        <Draggable onStart={()=>selectedTool==='select'}>
        <text x={transition.guard.x} y={transition.guard.y} fill='#66CC66' textAnchor='start'>{transition.guard.content}</text>
        </Draggable>
        {/* sync */}
        <Draggable onStart={()=>selectedTool==='select'}>
        <text x={transition.sync.x} y={transition.sync.y} fill='#33CCFF' textAnchor='start'>{transition.sync.content}</text>
        </Draggable>
        {/* update */}
        <Draggable onStart={()=>selectedTool==='select'}>
        <text x={transition.update.x} y={transition.update.y} fill='#0000FF' textAnchor='start'>{transition.update.content}</text>
        </Draggable>
        {/* arrow */}
        <polyline
          points={points}
          style={{ stroke: 'black', strokeWidth: 2 }}
          fill='none'
          markerEnd="url(#arrow)"
          onClick={(e)=>{
            dispatch(setOpenTransition(transition))
            dispatch(setTransitionOpen(true))
          }}
        />
      </>
  );
};

export default Transition;