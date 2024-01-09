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
import NutrifitService from "../utils/nutrifitService";
import HealthNavbar from "./HealthNavbar";
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

const MyMeals = () => {
  const { web5, did} = useContext(Web5Context);
  const nutrifitService = NutrifitService();

  const recipientdidRef = useRef(null);
  const [meals, selMeals] = useState([]);
  const [selected, setselected] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState([]);
  const [sharedMeals, setSharedMeals] = useState([]);

  const [open, setOpen] = useState(false);

  const getMeals = async () => {
    const userMealRecord = await nutrifitService.getUserMeal();
    const mealRecords = await nutrifitService.getRecordsWithParentId(userMealRecord[0].id);
    console.log("meal records", mealRecords);
    // const sharedMealList = await nutrifitService.getAllSharedMeal();
    // createSharedWMealElements(sharedMealList);
    createMealElements(mealRecords);
  };


  const handleOpen = async (wr) => {
    setSelectedMeal(wr);

    const foodRecords = await nutrifitService.getRecordsWithParentId(wr.id)
    console.log("food records", foodRecords);

    const foodElements = [];
    for(let fd of Object.values(foodRecords)){
      foodElements.push(
        <article id={fd.data.name} className="card programstoprogram d-flex flex-row align-items-center p-0" style={{ borderRadius: '25px' }} >
        <span className="h-100 m-0" style={{ width: '20%' }}>
          <img src={fd.data.imageurl} className="w-100" />
        </span>
        <h4 className="fw-bold w-50">{fd.data.name}</h4>
        <button className={"btn btn-outline-light fw-bold me-2"} 
        // onClick={()=>{myWorkoutService.updateWorkoutExerciseToggle(w.id, fd)}}
        style={{ width: '20%', backgroundColor: `${fd.completed ? 'green' : 'white'}`, color: 'black'}}
        >Eaten</button>
        <button 
        onClick={()=>{
          nutrifitService.deleteWithRecordId(fd.id);
          setTimeout(()=>{handleOpen(wr)}, 300);
        }} className="btn btn-light"
        >
          <DeleteIcon className="text-dark" />
        </button>
      </article>
      )
      setselected(foodElements);
    }

      setOpen(true);
  }
  const handleClose = () => {
    setselected('');
    setOpen(false);
  }
  
  const navigate = useNavigate();

  function createMealElements(mealRecords){
    const mealElement = [];

    for(let ml of Object.values(mealRecords)){
      mealElement.push(
        <article className="card programstoprogram d-flex flex-row align-items-center p-0" style={{ borderRadius: '25px' }} >
        <span className="h-100 m-0" style={{ width: '20%' }}>
          <img src={benchImg} className="w-100" />
        </span>
        <h4 className="fw-bold w-50">{ml.data.Name}</h4>
        <button id={ml.data.Name} onClick={()=>{handleOpen(ml)}} className="btn btn-outline-light fw-bold me-2" style={{ width: '20%' }}>Edit</button>
        <button 
        onClick={async ()=>{
          nutrifitService.deleteWithRecordId(ml.id);
          getMeals();
        }}
        className="btn btn-light">
          <DeleteIcon className="text-dark" />
        </button>
      </article>
      )
    }
    selMeals(mealElement);
  }

  function createSharedWMealElements(sharedWorkoutList){
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
    setSharedMeals(sharedWorkoutElement);
  }
  const handleShareWorkout = (e) => {
    console.log('Entering handleShareWorkout');
    console.log(recipientdidRef.current.value);
    console.log(selectedMeal);
    myWorkoutService.shareWorkout(selectedMeal, recipientdidRef.current.value);
    console.log('Exiting handleShareWorkout');
  };

  useEffect(() => {
    if(web5){
      getMeals();
    }
  }, [web5, did])


  
  return (
    <>
      <HealthNavbar />
      <section className="programs">
        <div className="container programstocontainer">
          <div className="row justify-content-evenly">
            <div className="col-6">
              <div className="sectiontohead undefined">
                <img className="me-4" src={dumbleImg} style={{ width: '50px' }} />
                <h2 className="fw-bold">Your Meals</h2>
              </div>
              <div className="programstowrapper d-flex flex-column">
                <button onClick={()=>{navigate("/health/create")}} className="btn btn-dark h-100 m-0 text-center w-100 border border-3" style={{ borderRadius: '25px' }}>
                  <AddCircleIcon style={{ height: '50px' }} />
                </button>
                {meals}
              </div>
            </div>
            <div className="col text-center d-flex">
              <div className="mx-auto" style={{ borderLeft: '6px solid white', height: '500px' }}></div>
            </div>

            <div className="col-4">
              <div className="sectiontohead undefined">
                <img className="me-4" src={dumbleImg} style={{ width: '50px' }} />
                <h2 className="fw-bold mb-0">Shared Meals</h2>
              </div>
              <div className="programstowrapper d-flex flex-column">
                {sharedMeals}
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

export default MyMeals;