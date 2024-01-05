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
                    {/* <Button color="inherit">Login</Button> */}
                    <Button className="p-3 mt-2 fw-bold" variant="outlined" color="inherit" startIcon={<WalletIcon />}>
                        Wallet Connect
                    </Button>
                </Toolbar>
                <div
                style={{
                    background: 'lime',
                    height: '3px',
                }}
            />
            </AppBar>
            <Toolbar className='mt-3'/>
        </React.Fragment>
    );
}