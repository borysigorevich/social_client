import React, {useState} from 'react';
import {Box, Button, TextField, Snackbar, CircularProgress} from '@mui/material'
import {useAuth} from "../../util/util.hooks";
import {CustomAlert} from "../../customComponents";
import {CREATE_POST} from "../../util/graphql";

const initialState = {body: ''}

const PostForm = () => {
    const [openSuccess, setOpenSuccess] = useState(false)

    const handleOpenSuccess = () => setOpenSuccess(true)
    const handleCloseSuccess = (_, reason) => {
        if (reason === 'clickaway') return
        setOpenSuccess(false)
    }

    const {
        userCredentials,
        loading,
        error,
        open: openError,
        handleChange,
        handleClose: handleCloseError,
        handleSubmit
    } = useAuth(initialState, CREATE_POST, 'createPost', handleOpenSuccess)

    return (
        <Box sx={{display: 'flex', margin: '0 auto 40px', width: '300px', flexDirection: 'column', gap: '20px'}}>
            <TextField variant={'standard'} label={'Your post message'} name={'body'} onChange={handleChange}
                       value={userCredentials.body} error={!!error}/>
            <Box sx={{textAlign: 'center'}}>{loading
                ? <CircularProgress/>
                : <Button variant={'contained'} color={'primary'} onClick={handleSubmit}>Create a post</Button>}</Box>
            <Snackbar open={openError} autoHideDuration={4000} onClose={handleCloseError}>
                <CustomAlert severity={'error'} onClose={handleCloseError}>{error ? error : 'Error'}</CustomAlert>
            </Snackbar>
            <Snackbar open={openSuccess} autoHideDuration={4000} onClose={handleCloseSuccess}>
                <CustomAlert
                    severity={'success'}
                    onClose={handleCloseSuccess}>
                    Post has been successfully created
                </CustomAlert>
            </Snackbar>
        </Box>
    );
};

export default PostForm;
