import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import WalletIcon from '@mui/icons-material/Wallet';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import Avatar from '@mui/material/Avatar';

import workoutIcon from '../assets/images/workoutIcon.png'

export default function HealthNavbar() {
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
                    <Typography className='ms-4 fw-bold' style={{fontFamily:'Tektur', fontSize:'25px'}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Nourish
                    </Typography>
                    {
                        document.location.href.split('/')[3] == "health" ?
                            <>
                                <div style={{fontFamily:'Space Mono'}} className='fw-bold w-50 d-flex justify-content-end'>
                                    <Link className='text-white mx-4' style={{ textDecoration: 'none' }} to="/health/create">Create Meals</Link>
                                    <Link className='text-white mx-4' style={{ textDecoration: 'none' }} to="/health/my">My Meals</Link>
                                </div>
                            </>
                            :
                            <></>
                    }
                    {/* <Button className="p-3 mt-2 fw-bold" variant="outlined" color="inherit" startIcon={<WalletIcon />}>
                        Wallet Connect
                    </Button> */}
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