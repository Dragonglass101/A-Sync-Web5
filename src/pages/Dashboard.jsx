
import DeleteEdgeDrop from "./DnDFlow";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import '../style/Dashboard.css';
import img_spotify2 from "../assets/images/spotify2.jpeg";
import img_music2 from "../assets/images/music2.jpeg";
import img_workout from "../assets/images/workout.jpeg"
import img_health from "../assets/images/health.jpeg"

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import FolderIcon from '@mui/icons-material/Folder';
import InfoIcon from '@mui/icons-material/Info';

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
    const [open, setOpen] = useState(false);
    const [selected, setselected] = useState('');
    const navigate = useNavigate();
    const handleOpen = (e) => {
        setselected(e.target.id)
        setOpen(true);
    }
    const handleClose = () => {
        setselected('')
        setOpen(false);
    }
    const handleNavigate = () => {
        navigate(selected + '/dashboard');
    }

    return (
        <>
            <h1 className='fw-bold text-light collection-slider my-5' style={{ fontFamily: "Space Mono" }}>Dashboard</h1>
            <div className=' d-flex'>
                <div className='w-50'>
                    <h3 className="text-center text-secondary fw-bold">Applications</h3>
                    <div className='collection-slider'>
                        <div className='collection-card'>
                            <img id="workout" onClick={handleOpen} src={img_workout} className='dashboard-app-card' />
                            <div className='' style={{ width: '300px' }}>
                                <h4 className='text-white fw-bold'>Kinetica</h4>
                                <span className='text-secondary'>Own Your Sweat, Own Your Goals. Train free with Kinetica</span>
                            </div>
                        </div>
                        <div className='collection-card'>
                            <img onClick={handleOpen} src={img_health} className='dashboard-app-card' />
                            <div className='' style={{ width: '300px' }}>
                                <h4 className='text-white fw-bold'>Nourish</h4>
                                <span className='text-secondary'>Nourish isn't just a diet app, it's a personalized journey to a healthier you.</span>
                            </div>
                        </div>
                        <div className='collection-card'>
                            <img src={img_music2} className='dashboard-app-card' />
                            <div className='' style={{ width: '300px' }}>
                                <h4 className='text-white fw-bold' >Harmony 5.0</h4>
                                <span className='text-secondary'>Unleash your music, own your data. Build your music world with Harmony.</span>
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
                </div>

                <div className='w-50 text-light d-flex justify-content-center align-content-start flex-wrap flex-row'>
                    <h3 className="text-center text-secondary fw-bold w-100 mb-4">Protocol Playground</h3>
                    <div>
                        <DeleteEdgeDrop />
                    </div>
                </div>
            </div>

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
                                Harmony 5.0 wants to access your Google Account
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography> */}
                            <div className="w-75 mx-auto">
                                <h3 className="fw-bold w-75 text-center mx-auto">
                                    <mark className="ps-0 pe-3" style={{ color: 'lime', background: 'none' }}>Harmony 5.0</mark>
                                    wants to access your Google Account
                                </h3>

                                <div className="d-flex mt-3 justify-content-center align-items-center">
                                    <Avatar sx={{ width: 30, height: 30 }}>
                                        <FolderIcon />
                                    </Avatar>
                                    <span className="ps-2">info@bart.com.hk</span>
                                </div>

                                <div className="my-4 fw-bold">
                                    <span>This will allow
                                        <mark className="px-2" style={{ color: 'lime', background: 'none' }}>Harmony 5.0</mark>
                                        to:
                                    </span>
                                </div>
                                <div className="my-2 d-flex">
                                    <FolderIcon />
                                    <p className="px-3 text-secondary">View and manage Google Drive files and folders that you have opened or created with this app</p>
                                    <InfoIcon />
                                </div>
                                <div className="mt-4">
                                    <h5 className="fw-bold">Make sure you trust Harmony 5.0</h5>
                                    <p className="text-secondary">
                                        You may be sharing sensitive info with this site or app. Find out how Simple Gmail Notes will handle your data by reviewing its terms of service and privacy policies. You can always see or remove access in your Google account.
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
        </>
    )
}
export default Dashboard;
