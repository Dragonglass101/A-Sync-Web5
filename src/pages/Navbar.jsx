import React, {useState, useEffect, useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import chadMan from '../assets/images/chadMan.jpeg'
import { Web5Context } from "../context/Web5Context";
import ProfileService from '../utils/profileService';

export default function Navbar() {
    const profileService = ProfileService();
    const { web5, did, protocolDefinition} = useContext(Web5Context);
    const [username, setUsername] = useState(null);

    const queryProfile = async () => {
        const profileInfoList = await profileService.getProfile();
        if(profileInfoList.length != 0) {
            setUsername(profileInfoList[0].data.username);
        }
        return profileInfoList;
    }
    
    useEffect(() => {
        if(web5){
            queryProfile();
        }
    }, [web5, did])

    return (
        <React.Fragment>
            <AppBar style={{ backgroundColor: 'black' }} position="fixed" color='secondary' enableColorOnDark>
                <Toolbar className='my-3'>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    {/* <FitnessCenterIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color:'#c88500' }} /> */}
                    {/* <img className='ms-3' src={workoutIcon} style={{height:'80px', width:'auto'}}/> */}
                    <Typography className='ms-4 fw-bold' style={{ fontFamily: 'Tektur', fontSize: '25px' }} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/workout/dashboard" style={{ textDecoration: 'none', color: 'white' }} >Fitbit</Link>
                    </Typography>
                    {
                        document.location.href.split('/')[3] == "workout" ?
                            <>
                                <div style={{ fontFamily: 'Space Mono' }} className='fw-bold w-50 d-flex justify-content-end'>
                                    <Link className='text-white mx-4' style={{ textDecoration: 'none' }} to="/workout/create">Create Workouts</Link>
                                    <Link className='text-white mx-4' style={{ textDecoration: 'none' }} to="/workout/my">My Workouts</Link>
                                </div>
                            </>
                            :
                            <></>
                    }
                    <IconButton sx={{ p: 0 }} className='ms-5'>
                        <Avatar alt="Remy Sharp" src={chadMan} />
                    </IconButton>
                    <Button variant='outlined' className='ms-2 fw-bold' style={{textTransform:'capitalize', fontFamily:'Space Mono', color:'rgb(18, 185, 129)'}}>
                        {username}
                    </Button>
                </Toolbar>
                <div
                    style={{
                        background: '#c88500',
                        height: '3px',
                    }}
                />
            </AppBar>
            <Toolbar className='mt-3' />
        </React.Fragment>
    );
}