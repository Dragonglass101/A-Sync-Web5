import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import WalletIcon from '@mui/icons-material/Wallet';

export default function Navbar() {
    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
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
                    <Button className="p-3 fw-bold" variant="outlined" color="inherit" startIcon={<WalletIcon />}>
                        Wallet Connect
                    </Button>
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </React.Fragment>
    );
}