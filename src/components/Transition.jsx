import {useRef} from 'react';
import Draggable from 'react-draggable';
import {useDispatch, useSelector} from 'react-redux';
import {setOpenTransition, setTransitionOpen} from '../store/modules/editor/drawer';
import {updateAutosTransition} from '../store/modules/editor/model';

const Transition = (props) => {
  const dispatch = useDispatch()
  const {transition} = props
  const selectRef = useRef(null)
  const guardRef = useRef(null)
  const syncRef = useRef(null)
  const updateRef = useRef(null)
  const {selectedTool} = useSelector(state => state.bar)
  const {locations} = useSelector(state => state.model.autos[0])
  const locationPairs = findLocationPairs(locations)
  const points = createPoints();

  function findLocationPairs(locations) {
    const sourceLocation = locations.find(location => location.id === transition.sourceId)
    const targetLocation = locations.find(location => location.id === transition.targetId)
    return [sourceLocation, targetLocation]
  }

  function createPoints() {
    const r = 12
    const x1 = locationPairs[0].x, y1 = locationPairs[0].y
    const x2 = locationPairs[1].x, y2 = locationPairs[1].y
    const xDir = x2 - x1 > 0 ? 1 : -1
    const yDir = y2 - y1 > 0 ? 1 : -1
    const angle = x1 === x2 ? Math.PI / 2 : Math.atan((y2 - y1) / (x2 - x1))
    const xOffset = Math.abs(Math.cos(angle) * r);
    const yOffset = Math.abs(Math.sin(angle) * r);
    const arr = [locationPairs[0].x + xDir * xOffset, locationPairs[0].y + yDir * yOffset]
    for (let nail of transition.nails) {
      arr.push(nail.x, nail.y)
    }
    arr.push(locationPairs[1].x - xDir * xOffset, locationPairs[1].y - yDir * yOffset)
    return arr;
  }

  function getOffset(ref) {
    const match = ref.current.getAttribute('transform').match(/translate\(([^,]+),\s*([^)]+)\)/)
    const x = parseInt(match[1])
    const y = parseInt(match[2])
    return [x, y]
  }

  function afterSelectDrag() {
    const tmp = getOffset(selectRef)
    dispatch(updateAutosTransition({
      ...transition,
      select: {...transition.select, x: transition.select.x + tmp[0], y: transition.select.y + tmp[1]}
    }))
  }

  function afterGuardDrag() {
    const tmp = getOffset(guardRef)
    dispatch(updateAutosTransition({
      ...transition,
      guard: {...transition.guard, x: transition.guard.x + tmp[0], y: transition.guard.y + tmp[1]}
    }))
  }

  function afterSyncDrag() {
    const tmp = getOffset(syncRef)
    dispatch(updateAutosTransition({
      ...transition,
      sync: {...transition.sync, x: transition.sync.x + tmp[0], y: transition.sync.y + tmp[1]}
    }))
  }

  function afterUpdateDrag() {
    const tmp = getOffset(updateRef)
    dispatch(updateAutosTransition({
      ...transition,
      update: {...transition.update, x: transition.update.x + tmp[0], y: transition.update.y + tmp[1]}
    }))
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
          <polyline points="0,0 6,3 0,6" fill="none" stroke="#000" strokeWidth="1"/>
        </marker>
      </defs>
      {/* select */}
      <Draggable onStart={() => selectedTool === 'select'} onStop={afterSelectDrag} position={{x: 0, y: 0}}>
        <text ref={selectRef} x={transition.select.x} y={transition.select.y}
              fill='#FFCC00'>{transition.select.content}</text>
      </Draggable>
      {/* guard */}
      <Draggable onStart={() => selectedTool === 'select'} onStop={afterGuardDrag} position={{x: 0, y: 0}}>
        <text ref={guardRef} x={transition.guard.x} y={transition.guard.y}
              fill='#66CC66'>{transition.guard.content}</text>
      </Draggable>
      {/* sync */}
      <Draggable onStart={() => selectedTool === 'select'} onStop={afterSyncDrag} position={{x: 0, y: 0}}>
        <text ref={syncRef} x={transition.sync.x} y={transition.sync.y} fill='#33CCFF'>{transition.sync.content}</text>
      </Draggable>
      {/* update */}
      <Draggable onStart={() => selectedTool === 'select'} onStop={afterUpdateDrag} position={{x: 0, y: 0}}>
        <text ref={updateRef} x={transition.update.x} y={transition.update.y}
              fill='#0000FF'>{transition.update.content}</text>
      </Draggable>
      {/* arrow */}
      <polyline
        points={points}
        style={{stroke: 'black', strokeWidth: 2}}
        fill='none'
        markerEnd="url(#arrow)"
        onClick={(e) => {
          if (selectedTool === 'select') {
            dispatch(setOpenTransition(transition))
            dispatch(setTransitionOpen(true))
          }

        }}
      />
    </>
  );
};

export default Transition;