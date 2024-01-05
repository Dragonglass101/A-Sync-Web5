import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const DEFAULT_HANDLE_STYLE = {
  width: 10,
  height: 10,
  bottom: -5,
};

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <div
        style={{
          // background: '#1c1c1c',
          padding: "5px",
          // paddingTop: '8px',
          // paddingBottom: '8px',
          // paddingRight: '25px',
          // paddingLeft: '25px',
          borderRadius: '70px',
          // border: '4px solid black'
        }}
      >
        <img src={data.img} style={{height: "100px", width: "100px", borderRadius: '25px',}}/>
        {/* <div style={{fontSize: "12px"}}>{data.label}</div> */}
        <Handle
          type="target"
          position={Position.Top}
          id="lightred"
          style={{ ...DEFAULT_HANDLE_STYLE, left: '50%', background: '#ff5757' }}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="green"
          style={{ ...DEFAULT_HANDLE_STYLE, left: '50%', background: '#86fe86' }}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
});
