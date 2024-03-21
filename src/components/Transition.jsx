import React from 'react';
import Draggable from 'react-draggable';
import { useSelector } from 'react-redux';
import Location from './Location';

const Transition = (props) => {
  const {transition} = props
  const {selectedTool} = useSelector(state=>state.bar)
  const {autos} = useSelector(state=>state.model)
  const locationPairs = findLocationPairs(autos[0].locations)
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
      arr.push(nail.x)
      arr.push(nail.y)
    }
    arr.push(locationPairs[1].x-xDir*xOffset)
    arr.push(locationPairs[1].y-yDir*yOffset)
    console.log(arr);
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
        {/* guard */}
        <Draggable onStart={()=>selectedTool==='select'}>
        <text x={locationPairs[0].x} y={locationPairs[0].y} fill='#66CC66' textAnchor='start'>{transition.guard}</text>
        </Draggable>
        {/* update */}
        <Draggable onStart={()=>selectedTool==='select'}>
        <text x={locationPairs[1].x} y={locationPairs[1].y} fill='#0000FF' textAnchor='end'>{transition.update}</text>
        </Draggable>
        {/* arrow */}
        <polyline
          points={points}
          style={{ stroke: 'black', strokeWidth: 1.5 }}
          fill='none'
          markerEnd="url(#arrow)"
        />
      </>
  );
};

export default Transition;