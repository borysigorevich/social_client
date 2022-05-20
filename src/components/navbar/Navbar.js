import React, {useContext} from 'react';
import {AppBar, Toolbar, Button, Box, Divider} from '@mui/material'
import {CustomNavLink} from "./Navbar.styles";
import {AuthContext} from "../../context/auth";

const Navbar = () => {
    const {user} = useContext(AuthContext)
    const {logout} = useContext(AuthContext)

    return (
        <AppBar position={'sticky'} sx={{alignItems: 'center'}}>
            <Toolbar sx={{width: '1115px', margin: '0 auto', justifyContent: 'space-between'}}>
                <CustomNavLink to={'/'}>
                    <Button variant={'text'} color={'secondary'}>{user ? user.username : 'Home'}</Button>
                </CustomNavLink>
                <Box sx={{display: 'flex'}}>
                    {!user
                        ? <>
                            <CustomNavLink to={'/login'}>
                                <Button variant={'text'} color={'secondary'}>Login</Button>
                            </CustomNavLink>
                            <Divider orientation="vertical" variant="fullWidth" sx={{borderColor: '#fff'}} flexItem/>
                            <CustomNavLink to={'/register'}>
                                <Button variant={'text'} color={'secondary'}>Register</Button>
                            </CustomNavLink>
                        </>
                        : <Button variant={'text'} onClick={logout} color={'secondary'}>Logout</Button>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
