import React, {useState, useContext, useEffect, useRef} from "react";
import dumbleImg from "../assets/images/dumble.png"
import benchImg from "../assets/images/bench.png"
import { Link, useNavigate } from "react-router-dom"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import { Web5Context } from "../context/Web5Context";

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import FitbitService from "../utils/fitbitService";
import Navbar from "./Navbar";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const MyWorkouts = () => {
  const { web5, did} = useContext(Web5Context);
  const fitbitService = FitbitService();

  const recipientdidRef = useRef(null);
  const [workouts, setWorkouts] = useState([]);
  const [selected, setselected] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState([]);
  const [sharedWorkouts, setSharedWorkouts] = useState([]);

  const [open, setOpen] = useState(false);

  const handleOpen = async (wr) => {
    setSelectedWorkout(wr);

    const exerciseRecords = await fitbitService.getRecordsWithParentId(wr.id)
    console.log("exercise records", exerciseRecords);

    const exerciseElements = [];
    for(let exe of Object.values(exerciseRecords)){
      exerciseElements.push(
        <article className="card programstoprogram d-flex flex-row align-items-center p-0" style={{ borderRadius: '25px' }} >
        <span className="h-100 m-0" style={{ width: '20%' }}>
          <img src={exe.data.imageurl} className="w-100" />
        </span>
        <h4 className="fw-bold w-50">{exe.data.name}</h4>
        <button className={"btn btn-outline-light fw-bold me-2"} 
        // onClick={()=>{myWorkoutService.updateWorkoutExerciseToggle(w.id, exe)}}
        style={{ width: '20%', backgroundColor: `${exe.completed ? 'green' : 'white'}`, color: 'black'}}
        >Completed</button>
        <button 
        // onClick={()=>{myWorkoutService.updateWorkoutDeleteExercise(w.id, exe)}} className="btn btn-light"
        >
          <DeleteIcon className="text-dark" />
        </button>
      </article>
      )
      setselected(exerciseElements);
    }

      setOpen(true);
  }
  const handleClose = () => {
    setselected('');
    setOpen(false);
  }
  
  const navigate = useNavigate();

  function createWorkoutElements(workoutRecords){
    const workoutElement = [];

    for(let wr of Object.values(workoutRecords)){
      workoutElement.push(
        <article className="card programstoprogram d-flex flex-row align-items-center p-0" style={{ borderRadius: '25px' }} >
        <span className="h-100 m-0" style={{ width: '20%' }}>
          <img src={benchImg} className="w-100" />
        </span>
        <h4 className="fw-bold w-50">{wr.data.Name}</h4>
        <button id={wr.data.Name} onClick={()=>{handleOpen(wr)}} className="btn btn-outline-light fw-bold me-2" style={{ width: '20%' }}>Edit</button>
        <button 
        // onClick={()=>{myWorkoutService.deleteWorkout(w.id)}} 
        className="btn btn-light">
          <DeleteIcon className="text-dark" />
        </button>
      </article>
      )
    }
    setWorkouts(workoutElement);
  }

  function createSharedWorkoutElements(sharedWorkoutList){
    console.log("shared")
    console.log(sharedWorkoutList);
    const sharedWorkoutElement = [];

    for(let w of Object.values(sharedWorkoutList)){
      if(w.data.record.author != did){
        sharedWorkoutElement.push(
          <article className="card programstoprogram d-flex flex-row align-items-center p-0" style={{ borderRadius: '25px' }} >
          <span className="h-100 m-0" style={{ width: '20%' }}>
            <img src={benchImg} className="w-100" />
          </span>
          <h4 className="fw-bold w-50">{w.data.data.Name}</h4>
          <button id={w.data.Name} onClick={()=>{handleOpen(w)}} className="btn btn-outline-light fw-bold me-2" style={{ width: '20%' }}>Edit</button>
          <button onClick={()=>{myWorkoutService.deleteWorkout(w.id)}}className="btn btn-light">
            <DeleteIcon className="text-dark" />
          </button>
        </article>
        )
      }
    }
    setSharedWorkouts(sharedWorkoutElement);
  }

  useEffect(() => {
    const getWorkouts = async () => {
      const userWorkoutRecord = await fitbitService.getUserWorkout();
      const workoutRecords = await fitbitService.getRecordsWithParentId(userWorkoutRecord[0].id);
      console.log("workout records", workoutRecords);
      // const sharedWorkoutList = await myWorkoutService.getAllSharedWorkout();

      // createSharedWorkoutElements(sharedWorkoutList);
      createWorkoutElements(workoutRecords);
    };

    if(web5){
      getWorkouts();
    }
  }, [web5, did])


  const handleShareWorkout = (e) => {
    console.log('Entering handleShareWorkout');
    console.log(recipientdidRef.current.value);
    console.log(selectedWorkout);
    myWorkoutService.shareWorkout(selectedWorkout, recipientdidRef.current.value);
    console.log('Exiting handleShareWorkout');
  };
  
  return (
    <>
      <Navbar/>
      <section className="programs">
        <div className="container programstocontainer">
          <div className="row justify-content-evenly">
            <div className="col-6">
              <div className="sectiontohead undefined">
                <img className="me-4" src={dumbleImg} style={{ width: '50px' }} />
                <h2 className="fw-bold">Your Workouts</h2>
              </div>
              <div className="programstowrapper d-flex flex-column">
                <button onClick={()=>{navigate("/workout/create")}} className="btn btn-dark h-100 m-0 text-center w-100 border border-3" style={{ borderRadius: '25px' }}>
                  <AddCircleIcon style={{ height: '50px' }} />
                </button>
                {workouts}
              </div>
            </div>
            <div className="col text-center d-flex">
              <div className="mx-auto" style={{ borderLeft: '6px solid white', height: '500px' }}></div>
            </div>

            <div className="col-4">
              <div className="sectiontohead undefined">
                <img className="me-4" src={dumbleImg} style={{ width: '50px' }} />
                <h2 className="fw-bold mb-0">Shared Workouts</h2>
              </div>
              <div className="programstowrapper d-flex flex-column">
                {sharedWorkouts}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style} className="bg-dark text-white">
                        <input ref={recipientdidRef} type="text" className="form-control" id="workout-day" placeholder="Did"/>
                        <button onClick={handleShareWorkout}>Share</button>
                          <div className="programstowrapper d-flex flex-column">
                            {selected}
                          </div>
                        </Box>
                    </Fade>
                </Modal>
            </div>
    </>
  )
}

export default MyWorkouts;