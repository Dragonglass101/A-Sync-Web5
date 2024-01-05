import React, { useCallback, useRef } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Controls, updateEdge, addEdge, Background, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import '../style/dnd.css'
import CustomNode from '../graphComponents/CustomNode';
import ConnectionLine from '../graphComponents/ConnectionLine';

import spotifyLogo from "../assets/images/spotify2.jpeg"
import fitbitLogo from "../assets/images/workout.jpeg"
import applemusicLogo from "../assets/images/music2.jpeg"
import nutritionLogo from "../assets/images/health.jpeg"

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    data: { label: 'Nutrition App', img: nutritionLogo },
    position: { x: 300, y: 0 },
  },
  {
    id: '2',
    type: 'custom',
    data: { label: 'Apple Music', img: applemusicLogo },
    position: { x: 300, y: 500 },
  },
  {
    id: '3',
    type: 'custom',
    data: { label: 'Spotify', img: spotifyLogo },
    position: { x: 800, y: 500 },
  },
  {
    id: '4',
    type: 'custom',
    data: { label: 'Fitbit', img: fitbitLogo },
    position: { x: 800, y: 0 },
  },
];

const nodeTypes = {
  custom: CustomNode,
};

const initialEdges = [];

const DeleteEdgeDrop = () => {
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  function changeParams(params){
    return {
      source: params.source,
      sourceHandle: "green",
      target: params.target,
      targetHandle: "lightred",
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#FF0072',
      },
      style: {
        strokeWidth: 2,
        stroke: '#FF0072',
      },
    };
  }

  const onConnect = useCallback((params) => setEdges((els) => addEdge(changeParams(params), els)), []);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  return (
    <div className='graph-background' style={{width:"600px", height:"600px", borderRadius: "25px"}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        snapToGrid
        connectionLineComponent={ConnectionLine}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        onConnect={onConnect}
        fitView
        attributionPosition="top-right"
      >
        <Controls />
        <Background variant="lines" color='black'/>
      </ReactFlow>
    </div>
  );
};

export default DeleteEdgeDrop;
