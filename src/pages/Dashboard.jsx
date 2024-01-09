
import DnDFlow from "./DnDFlow";
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import FitbitService from "../utils/fitbitService";
import NutrifitService from "../utils/nutrifitService";
import ProfileService from "../utils/profileService";
import { Web5Context } from "../context/Web5Context";

import '../style/Dashboard.css';
import img_spotify2 from "../assets/images/spotify2.jpeg";
import img_music2 from "../assets/images/music2.jpeg";
import img_workout from "../assets/images/workout.jpeg"
import img_health from "../assets/images/health.jpeg"
import chadMan from "../assets/images/chadMan.jpeg"

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import FolderIcon from '@mui/icons-material/Folder';
import InfoIcon from '@mui/icons-material/Info';

import { styled } from '@mui/system';
import { Tabs as BaseTabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';


import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';

//BACKDROP
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

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

const Dashboard = () => {
    const { web5, did, protocolDefinition} = useContext(Web5Context);
    
    //BACKDROP
    const [backdropOpen, setBackdropOpen] = React.useState(false);
    const closeBackdrop = () => {
        setBackdropOpen(false);
    };
    const openBackdrop = () => {
        setBackdropOpen(true);
    };
    //BACKDROP

    const fitbitService = FitbitService();
    const nutrifitService = NutrifitService();
    const profileService = ProfileService();
    const [open, setOpen] = useState(false);
    const [selected, setselected] = useState('');
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const usernameRef = useRef();
    const fullnameRef = useRef();
    const emailRef = useRef();

    const queryProfile = async () => {
        const profileInfoList = await profileService.getProfile();
        if(profileInfoList.length != 0) {
            setProfile(
                {
                    "username": profileInfoList[0].data.username,
                    "fullname": profileInfoList[0].data.fullname,
                    "email": profileInfoList[0].data.email,
                }
            );
        }
        return profileInfoList;
    }
    
    useEffect(() => {
        if(web5){
            queryProfile();
        }
    }, [web5, did])

    async function handleProfileCreate(){
        if(profile == null){
            await profileService.createProfile(
                {
                    "username": usernameRef.current.value,
                    "fullname": fullnameRef.current.value,
                    "email": emailRef.current.value
                }
            )
            queryProfile();
        }
    }
    

    const handleOpen = async (e) => {
        var baseList = null;
        if (e.target.id == "workout")
            baseList = await fitbitService.getUserWorkout();
        if (e.target.id == "health")
            baseList = await nutrifitService.getUserMeal();

        console.log(baseList);

        if (baseList.length === 0) {
            setselected(e.target.id);
            setOpen(true);
        }
        else {
            navigate(e.target.id + '/dashboard');
        }
    }
    const handleClose = () => {
        setselected('')
        setOpen(false);
    }
    const handleNavigate = async () => {
        if (selected == "workout")
            await fitbitService.createUserWorkout();
        if (selected == "health")
            await nutrifitService.createUserMeal();

        navigate(selected + '/dashboard');
    }

    return (
        <>
            <div className="container d-flex flex-column align-items-center justify-content-center mt-3">
                <div>
                    <Button onClick={openBackdrop}>Show backdrop</Button>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={backdropOpen}
                        onClick={closeBackdrop}
                    >
                        <div className="d-flex justify-content-center p-5" style={{backgroundColor:'black'}}>
                            <CircularProgress color="inherit" />
                            <h3 className="ms-5 fw-bold" style={{ color: 'rgb(18, 185, 129)' }}>Protocol Loading ...</h3>
                        </div>
                    </Backdrop>
                </div>
                <h3 className='fw-bold' style={{ fontFamily: "Space Mono", color: '#12b981' }}>Access Manager</h3>

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
                                {/* <Typography id="transition-modal-title" variant="h6" component="h2">
                                A-Sync wants to access your Google Account
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography> */}
                                <div className="w-75 mx-auto">
                                    <h3 className="fw-bold w-75 text-center mx-auto">
                                        <mark className="ps-0 pe-3" style={{ color: 'lime', background: 'none' }}>A-Sync</mark>
                                        wants to access your Web5 Account
                                    </h3>

                                    <div className="d-flex mt-3 justify-content-center align-items-center">
                                        <Avatar sx={{ width: 30, height: 30 }}>
                                            <FolderIcon />
                                        </Avatar>
                                        <span className="ps-2">info@web5.com.hk</span>
                                    </div>

                                    <div className="my-4 fw-bold">
                                        <span>This will allow the app to:
                                            {/* <mark className="px-2" style={{ color: 'lime', background: 'none' }}>A-Sync</mark> */}
                                        </span>
                                    </div>
                                    <div className="my-2 d-flex">
                                        <FolderIcon />
                                        <p className="px-3 text-secondary">Enables the app to optimize your experience by accessing profile permissions</p>
                                        <InfoIcon />
                                    </div>
                                    <div className="mt-4">
                                        <h5 className="fw-bold">Make sure you trust the app</h5>
                                        <p className="text-secondary">
                                        To enhance your experience with our app, we kindly request access to profile permissions. Your authorization ensures a personalized and seamless user journey. Rest assured, our app strictly adheres to robust data protection protocols, aligning with legal and industry standards. Your privacy is our priority, and we appreciate your cooperation in safeguarding your data.
                                        </p>
                                    </div>
                                    <div className="d-flex justify-content-end mt-5">
                                        <Button onClick={handleClose} className="mx-2" variant="outlined">Cancel</Button>
                                        <Button onClick={handleNavigate} className="mx-2" variant="contained">Allow</Button>
                                    </div>
                                </div>
                            </Box>
                        </Fade>
                    </Modal>
                </div>

                <Tabs defaultValue={1} orientation="vertical" className="mx-auto justify-content-center py-5">
                    <TabsList>
                        <Tab value={0}> <AccountCircleIcon className="me-3" /> User Profile</Tab>
                        <Tab value={1}> <AppsIcon className="me-3" /> My Apps</Tab>
                        <Tab value={2}> <SettingsIcon className="me-3" /> Manage Permissions</Tab>
                    </TabsList>
                    <TabPanel value={0}>
                        <div className="w-50 my-2 h-100">
                            <Avatar className="mb-3 mx-auto" src={chadMan} style={{ height: '150px', width: '150px' }} />
                            <label for="exampleFormControlInput1" className="form-label font15 fw-bold">User Name</label>
                            {profile ?  
                            <input value={profile.username} type="text" className="mb-4 form-control bg-dark text-light" id="exampleFormControlInput1" disabled/>
                            : 
                            <input ref={usernameRef} type="text" className="mb-4 form-control bg-dark text-light" id="exampleFormControlInput1" placeholder="Userame"/>
                            }
                            <label for="exampleFormControlInput1" className="form-label font15 fw-bold">Full Name</label>
                            {profile ?  
                            <input value={profile.fullname} type="text" className="mb-4 form-control bg-dark text-light" id="exampleFormControlInput1" disabled/>
                            : 
                            <input ref={fullnameRef} type="text" className="mb-4 form-control bg-dark text-light" id="exampleFormControlInput1" placeholder="Full Name"/>
                            }
                            <label for="exampleFormControlInput1" className="form-label font15 fw-bold">Email Account</label>
                            {profile ?  
                            <input value={profile.email} type="text" className="mb-4 form-control bg-dark text-light" id="exampleFormControlInput1" disabled/>
                            : 
                            <>
                            <input ref={emailRef} type="text" className="mb-4 form-control bg-dark text-light" id="exampleFormControlInput1" placeholder="Email"/>
                            <Button onClick={handleProfileCreate} className="mt-5 d-block w-100 fw-bold" variant="outlined" color="primary" style={{color:'#12b981', borderColor:'#12b981'}}>
                                submit
                            </Button> </>
                            }
                        </div>
                    </TabPanel>
                    <TabPanel value={1}>
                        <div className='collection-slider'>
                            <div className='collection-card'>
                                <img id="workout" onClick={handleOpen} src={img_workout} className='dashboard-app-card' />
                                <div className='' style={{ width: '300px' }}>
                                    <h4 className='text-white fw-bold'>Fitbit</h4>
                                    <span className='text-secondary'>Own Your Sweat, Own Your Goals. Train free with Kinetica</span>
                                </div>
                            </div>
                            <div className='collection-card'>
                                <img id="health" onClick={handleOpen} src={img_health} className='dashboard-app-card' />
                                <div className='' style={{ width: '300px' }}>
                                    <h4 className='text-white fw-bold'>NutriFit</h4>
                                    <span className='text-secondary'>A personalized journey to a healthier you.</span>
                                </div>
                            </div>
                            <div className='collection-card'>
                                <img src={img_music2} className='dashboard-app-card' />
                                <div className='' style={{ width: '300px' }}>
                                    <h4 className='text-white fw-bold' >A-Sync</h4>
                                    <span className='text-secondary'>Build your music world with Harmony.</span>
                                </div>
                            </div>
                            <div className='collection-card'>
                                <img src={img_spotify2} className='dashboard-app-card' />
                                <div className='' style={{ width: '300px' }}>
                                    <h4 className='text-white fw-bold'>Spotify 5.0</h4>
                                    <span className='text-secondary'>Your ears, your data, your choice. This is Spotify 5.0</span>
                                </div>
                            </div>

                        </div>
                    </TabPanel>
                    <TabPanel value={2}>
                        <div>
                            <DnDFlow />
                            {/* <button>Update Protocols</button> */}
                            {/* <Button className="mt-5 d-block w-100 fw-bold" variant="outlined" color="primary" style={{ color: '#12b981', borderColor: '#12b981' }}>
                                Update Protocol
                            </Button> */}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}

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

const Tab = styled(BaseTab)`
    font-family: 'Space Mono', sans-serif;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    background-color: transparent;
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 7px;
    display: flex;
  
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
      color: #12b981;
    }
  `;

const TabPanel = styled(BaseTabPanel)`
    width: 700px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    background-color: rgb(15,25,36);
    padding: 40px;
    border-radius: 25px;
  `;

const Tabs = styled(BaseTabs)`
    display: flex;
    gap: 16px;
    width: 100%;
    height: 750px;
  `;

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

export default Dashboard;