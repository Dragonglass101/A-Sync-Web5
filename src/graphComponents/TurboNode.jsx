import React, { memo, ReactNode } from 'react';
import { Handle, Position } from 'reactflow';
import { FiCloud } from 'react-icons/fi';

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <div className="wrapper gradient" style={{background:'rgb(17, 17, 17)', borderRadius: '25px'}}>
        <div className="inner">
          <div className="body">
          <img src={data.img} style={{height: "100px", width: "100px", borderRadius: '25px',}}/>

          </div>
              {/* <div className="title">{data.label}</div> */}
        </div>
      </div>
          <Handle
          type="target"
          position={Position.Top}
          id="lightred"
          style={{background: '#e92a67', width:'10px', height:'10px' }}
          isConnectable={isConnectable}
          />
        <Handle
          type="source"
          position={Position.Bottom}
          id="green"
          style={{background: '#2a8af6', width:'10px', height:'10px' }}
          isConnectable={isConnectable}
        />
    </>
  );
});
