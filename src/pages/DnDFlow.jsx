import React, { useCallback, useRef } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Controls, updateEdge, addEdge, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from '../graphComponents/CustomNode';
import ConnectionLine from '../graphComponents/ConnectionLine';

import spotifyLogo from "../assets/spotify-logo.png"
import fitbitLogo from "../assets/fitbit-logo.png"
import applemusicLogo from "../assets/applemusic-logo.png"
import nutritionLogo from "../assets/nutrition-logo.png"

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    data: { label: 'Nutrition App', img: nutritionLogo },
    position: { x: 100, y: 0 },
  },
  {
    id: '2',
    type: 'custom',
    data: { label: 'Apple Music', img: applemusicLogo },
    position: { x: 100, y: 200 },
  },
  {
    id: '3',
    type: 'custom',
    data: { label: 'Spotify', img: spotifyLogo },
    position: { x: 350, y: 200 },
  },
  {
    id: '4',
    type: 'custom',
    data: { label: 'Fitbit', img: fitbitLogo },
    position: { x: 350, y: 0 },
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
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

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
    <div style={{width:"600px", height:"600px", backgroundColor:"rgba(1,1,1,0.15)", borderRadius: "50px"}}>
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
        {/* <Background variant="lines" /> */}
      </ReactFlow>
    </div>
  );
};

export default DeleteEdgeDrop;
