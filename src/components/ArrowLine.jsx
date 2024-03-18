import React from 'react';

const ArrowLine = ({ x1, y1, x2, y2 }) => {
  return (
    <div style={{position:'absolute',left:Math.min(x1,x2), top:Math.min(y1,y2)-10}}>
      <svg className="arrow-line-svg" width={Math.abs(x2-x1)} height={Math.abs(y2-y1)+20}>
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
        <line
          x1={x1<x2?0:x1-x2}
          y1={y1<y2?10:y1-y2+10}
          x2={x2>x1?x2-x1:0}
          y2={y2>y1?y2-y1+10:10}
          style={{ stroke: 'black', strokeWidth: 1.5 }}
          markerEnd="url(#arrow)"
        />
      </svg>
    </div>
  );
};

export default ArrowLine;