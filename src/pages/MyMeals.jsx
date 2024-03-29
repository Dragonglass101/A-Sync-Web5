import React, { useState, useContext, useEffect, useRef } from "react";
import dumbleImg from "../assets/images/dumble.png"
import benchImg from "../assets/images/bowl1_ai.png"
// import fruitPileImg from "../assets/images/fruitpile.png"
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

import { styled } from '@mui/system';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppsIcon from '@mui/icons-material/Apps';
import { RamenDiningSharp } from "@mui/icons-material";

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
  const { web5, did } = useContext(Web5Context);
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
    for (let fd of Object.values(foodRecords)) {
      foodElements.push(
        <article id={fd.data.name} className="card programstoprogram d-flex flex-row align-items-center p-0" style={{ borderRadius: '25px' }} >
          <span className="h-100 m-0" style={{ width: '20%' }}>
            <img src={fd.data.imageurl} className="w-100" />
          </span>
          <h4 className="fw-bold w-50">{fd.data.name}</h4>
          <button className={"btn btn-outline-light fw-bold me-2"}
            // onClick={()=>{myWorkoutService.updateWorkoutExerciseToggle(w.id, fd)}}
            style={{ width: '20%', backgroundColor: `${fd.data.completed ? 'green' : 'white'}`, color: 'black' }}
          >Eaten</button>
          <button
            onClick={() => {
              nutrifitService.deleteWithRecordId(fd.id);
              setTimeout(() => { handleOpen(wr) }, 300);
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

  function createMealElements(mealRecords) {
    const mealElement = [];

    for (let ml of Object.values(mealRecords)) {
      mealElement.push(
        <article className="card programstoprogram d-flex flex-row align-items-center p-0 px-4" style={{ borderRadius: '0px' }} >
          <span className="h-100 m-0" style={{ width: '20%' }}>
            <img src={benchImg} className="w-100" />
          </span>
          <p className="fw-bold w-50 text-light mb-2 ps-3 text-start">{ml.data.Name}</p>
          <Button id={ml.data.Name} onClick={() => { handleOpen(ml) }} variant="outlined" size="small" className="fw-bold me-2" style={{ width: '20%' }}>Edit</Button>
          <Button variant="contained" size="small"
            onClick={async () => {
              nutrifitService.deleteWithRecordId(ml.id);
              getMeals();
            }}
            className="btn btn-light">
            <DeleteIcon className="text-dark" />
          </Button>
        </article>
      )
    }
    selMeals(mealElement);
  }

  function createSharedWMealElements(sharedWorkoutList) {
    console.log("shared")
    console.log(sharedWorkoutList);
    const sharedWorkoutElement = [];

    for (let w of Object.values(sharedWorkoutList)) {
      if (w.data.record.author != did) {
        sharedWorkoutElement.push(
          <article className="card programstoprogram d-flex flex-row align-items-center p-0 pe-2" style={{ borderRadius: '25px' }} >
            <span className="h-100 m-0" style={{ width: '20%' }}>
              <img src={benchImg} className="w-100" />
            </span>
            <h4 className="fw-bold w-50">{w.data.data.Name}</h4>
            <button id={w.data.Name} onClick={() => { handleOpen(w) }} className="btn btn-outline-light fw-bold me-2" style={{ width: '20%' }}>Edit</button>
            <button onClick={() => { myWorkoutService.deleteWorkout(w.id) }} className="btn btn-light">
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
    if (web5) {
      getMeals();
    }
  }, [web5, did])



  return (
    <>
      <HealthNavbar />
      <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: '90vh' }}>
        <Tabs defaultValue={0} className="mx-auto justify-content-center align-items-top py-5">
          <TabsList className='flex-row'>
            <Tab value={0}> <RamenDiningSharp className="me-3" /> My Meals</Tab>
            <Tab value={1}> <AppsIcon className="me-3" />Shared Meals</Tab>
          </TabsList>
          <TabPanel value={0} style={{ overflowY: 'scroll' }} className="scrollset">
            <div className="d-flex flex-column">
              <Button onClick={() => { navigate("/health/create") }} variant="outlined" className="py-3" style={{ textTransform: 'capitalize', fontFamily: 'Space Mono' }} startIcon={<AddCircleIcon />}>
                Create New Meal
              </Button>
              {meals}
            </div>
          </TabPanel>
          <TabPanel value={1} style={{ overflowY: 'scroll' }} className="scrollset">
            <div className="d-flex flex-column">
              {sharedMeals}
            </div>
          </TabPanel>
        </Tabs>
      </div >
       {/* <section className="programs">
         <div className="container programstocontainer">
           <div className="row justify-content-evenly">
             <div className="col-6">
               <div className="sectiontohead undefined">
                 <img className="me-4" src={dumbleImg} style={{ width: '50px' }} />
                 <h2 className="fw-bold">Your Meals</h2>
               </div>
               <div className="programstowrapper d-flex flex-column">
                 <button onClick={() => { navigate("/health/create") }} className="btn btn-dark h-100 m-0 text-center w-100 border border-3" style={{ borderRadius: '25px' }}>
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
       </section> */}
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
              <input ref={recipientdidRef} type="text" className="form-control" id="workout-day" placeholder="Did" />
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

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};
const Tab = styled(BaseTab)`
  font-family: 'Space Mono', sans-serif;
    color: white;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: bold;
    background-color: transparent;
    width: 300px;
    line-height: 1.5;
    padding: 8px 12px;
    margin: 6px;
    border: none;
    border-radius: 8px;
    display: flex;
    justify-content: center;

  &:hover {
    background-color: #242a38;
  }

  &:focus {
    color: #fff;
    outline: #242a38;
  }

  &.${buttonClasses.focusVisible} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${tabClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.${tabClasses.selected} {
    background-color: #242a38;
    color: #1976d2;
  }
`;

const TabPanel = styled(BaseTabPanel)`
  width: 800px;
  height: 500px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  background-color: rgb(15,25,36);
  padding: 40px;
  border-radius: 25px;
`;

// const Tabs = styled(BaseTabs)`
//     display: flex;
//     gap: 16px;
//     width: 100%;
//     height: 750px;
//   `;

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  min-width: 300px;
  background-color: rgb(18,24,39);
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  padding: 6px;
  gap: 12px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 8px ${theme.palette.mode === 'light' ? grey[900] : grey[200]};
  `,
);

export default MyMeals;