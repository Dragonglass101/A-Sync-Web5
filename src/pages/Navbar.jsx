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

export default function Navbar() {
    return (
        <React.Fragment>
            <AppBar style={{ backgroundColor: 'black' }} position="fixed" color='secondary' enableColorOnDark>
                <Toolbar className='my-3'>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className='fw-bold' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        App
                    </Typography>
                    {
                        document.location.href.split('/')[3] == "workout" ?
                            <>

                                {/* <Button style={{fontFamily:'Space Mono', textTransform:'capitalize'}} className="p-3 mt-2 mx-2 fw-bold" variant="outlined" color="inherit" startIcon={<AddToPhotosIcon />}> */}
                                {/* </Button> */}
                                {/* <Button style={{fontFamily:'Space Mono', textTransform:'capitalize'}} className="p-3 mt-2 mx-2 fw-bold" variant="outlined" color="inherit" startIcon={<FitnessCenterIcon />}> */}
                                {/* </Button> */}
                                <div style={{fontFamily:'Space Mono'}} className='fw-bold w-25 d-flex justify-content-evenly'>
                                    <Link className='text-white' style={{ textDecoration: 'none' }} to="workout/create">Create Workouts</Link>
                                    <Link className='text-white' style={{ textDecoration: 'none' }} to="workout/my">My Workouts</Link>
                                </div>
                            </>
                            :
                            <></>
                    }
                    <Button className="p-3 mt-2 fw-bold" variant="outlined" color="inherit" startIcon={<WalletIcon />}>
                        Wallet Connect
                    </Button>
                </Toolbar>
                <div
                    style={{
                        background: '#e92a67',
                        height: '3px',
                    }}
                />
            </AppBar>
            <Toolbar className='mt-3' />
        </React.Fragment>
    );
}