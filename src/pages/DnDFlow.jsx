import React, { useState, useCallback, useRef, useEffect, useContext } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Controls, updateEdge, addEdge, Background, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import '../style/dnd.css'
import '../style/turbo.css'
import CustomNode from '../graphComponents/CustomNode';
import TurboNode from '../graphComponents/TurboNode';
import ConnectionLine from '../graphComponents/ConnectionLine';

import spotifyLogo from "../assets/images/spotify2.jpeg"
import fitbitLogo from "../assets/images/workout.jpeg"
import applemusicLogo from "../assets/images/music2.jpeg"
import nutritionLogo from "../assets/images/health.jpeg"
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { Web5Context } from "../context/Web5Context";

const initialNodes = [
  {
    id: 'nutrifit',
    type: 'turbo',
    data: { label: 'Nutrition App', img: nutritionLogo },
    position: { x: 300, y: 0 },
  },
  {
    id: 'applemusic',
    type: 'turbo',
    data: { label: 'Apple Music', img: applemusicLogo },
    position: { x: 300, y: 500 },
  },
  {
    id: 'spotify',
    type: 'turbo',
    data: { label: 'Spotify', img: spotifyLogo },
    position: { x: 800, y: 500 },
  },
  {
    id: 'fitbit',
    type: 'turbo',
    data: { label: 'Fitbit', img: fitbitLogo },
    position: { x: 800, y: 0 },
  },
];

const nodeTypes = {
  custom: CustomNode,
  turbo: TurboNode
};

const proOptions = { hideAttribution: true };

const DnDFlow = () => {
  const { web5, did, protocolDefinition} = useContext(Web5Context);
  const [ newProtocol, setnewProtocol] = useState(null);

  const queryProtocol = async () => {
    const { protocols, status } = await web5.dwn.protocols.query({
      message: {
        filter: {
          protocol: protocolDefinition.protocol,
        },
      },
    });
  
    console.log("protocol", protocols);
    setnewProtocol(protocols[0].definition);
  }

  useEffect(() => {

    if(web5 && did){
      queryProtocol();
    }
  }, [web5, did])

  const initialEdges = [];

  const edgeUpdateSuccessful = useRef(true);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  function changeParams(params){
    const tempProtocol = newProtocol;

    const permission1 = {
      "role": "fitbit",
      "can": "read"
    }
    const permission2 = {
      "role": "nutrifit",
      "can": "read"
    }
    const actions1 = tempProtocol.structure.usermeal["$actions"];
    const actions2 = tempProtocol.structure.userworkout["$actions"];
    if(params.source == "fitbit" && params.target == "nutrifit"){
      if(!actions1.some(obj => permission1.role === obj["role"] && permission1.can === obj["can"])){
        tempProtocol.structure.usermeal["$actions"].push(permission1);
      }
    }
    if(params.source == "nutrifit" && params.target == "fitbit"){
      console.log("for nutrifit")
      if(!actions2.some(obj => permission2.role === obj["role"] && permission2.can === obj["can"])){
        tempProtocol.structure.userworkout["$actions"].push(permission2);
      }
    }
    console.log(tempProtocol);
    setnewProtocol(tempProtocol)

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
      updatable: "target"
    };
  }

  const onConnect = useCallback((params) => setEdges((els) => addEdge(changeParams(params), els)), [newProtocol]);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  function objExists(arr, obj){
    for(let ob of arr){
      if(ob['role'] === obj['role'] && ob['can'] === obj['can']) 
        return true;
    }
    return false;
  }

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    const tempProtocol = newProtocol;
    const permission1 = {
      "role": "fitbit",
      "can": "read"
    }
    const permission2 = {
      "role": "nutrifit",
      "can": "read"
    }
    const actions1 = tempProtocol.structure.usermeal["$actions"];
    const actions2 = tempProtocol.structure.userworkout["$actions"];
    if(edge.source == "fitbit" && edge.target == "nutrifit"){
      if(objExists(actions1, permission1)){
        console.log("1")
        const tempActions = tempProtocol.structure.usermeal["$actions"];
        tempProtocol.structure.usermeal["$actions"] = tempActions.filter(obj => permission1.role !== obj["role"] || permission1.can !== obj["can"]);
      }
    }
    if(edge.source == "nutrifit" && edge.target == "fitbit"){
      if(objExists(actions2, permission2)){
        console.log("2")
        var tempActions = tempProtocol.structure.userworkout["$actions"];
        tempActions = tempActions.filter(obj => permission2.role !== obj["role"] || permission2.can !== obj["can"]);
        tempProtocol.structure.userworkout["$actions"] = tempActions;
      }
    }
    console.log(tempProtocol);
    setnewProtocol(tempProtocol)

    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, [newProtocol]);

  const [backdropOpen, setBackdropOpen] = useState(false);
  const closeBackdrop = () => {
      setBackdropOpen(false);
  };
  const openBackdrop = () => {
      setBackdropOpen(true);
  };

  const installNewProtocol = async () => {
    try {
      openBackdrop();
      const { protocol, status } = await web5.dwn.protocols.configure({
        message: {
          definition: newProtocol,
        },
      });
      await protocol.send(did);
      queryProtocol();
      closeBackdrop();
    } catch (error) {
      console.error("Error installing new protocol: : ", error);
    }
  };

  return (
    <>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdropOpen}
      >
        <div className="d-flex justify-content-center p-5" style={{backgroundColor:'black'}}>
            <CircularProgress color="inherit" />
            <h3 className="ms-5 fw-bold" style={{ color: 'rgb(18, 185, 129)' }}>Installing New Protocol ...</h3>
        </div>
      </Backdrop>
    <div className='graph-background' style={{width:"600px", height:"600px", borderRadius: "25px"}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
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
        <Background/>
      </ReactFlow>
    </div>
    <Button onClick={installNewProtocol} className="mt-5 d-block w-100 fw-bold" variant="outlined" color="primary" style={{color:'#12b981', borderColor:'#12b981'}}>
      Update Protocol
    </Button>
    </>
  );
};

export default DnDFlow;
