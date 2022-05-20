import {TextField, Snackbar, Button, Stack, Typography, CircularProgress} from "@mui/material";
import {gql} from '@apollo/client'
import {Navigate} from 'react-router-dom'
import {CustomAlert, CustomBox} from "../../customComponents";
import {useAuth} from "../../util/util.hooks";

const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password){
            username
            token
            createdAt
            email
        }
    }
`

const initialCredentials = {
    username: '',
    password: ''
}

const Login = () => {
    const {
        userCredentials,
        open,
        error,
        loading,
        user,
        handleSubmit,
        handleClose,
        handleChange
    } = useAuth(initialCredentials, LOGIN, 'login')

    if(user) return <Navigate to={'/'}/>

    return (
        <CustomBox>
            <Typography variant={'h4'} mb={3}>Login</Typography>
            <Stack width={300} spacing={2} mb={4}>
                <TextField
                    variant={'standard'}
                    name={'username'}
                    onChange={handleChange}
                    label={'Username'}
                    value={userCredentials.username}/>
                <TextField
                    variant={'standard'}
                    name={'password'}
                    onChange={handleChange}
                    label={'Password'}
                    type={'password'}
                    value={userCredentials.password}/>
            </Stack>
            {loading ? <CircularProgress/> : <Button variant={'contained'} onClick={handleSubmit}>Login</Button>}
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <CustomAlert severity={'error'} onClose={handleClose}>{error}</CustomAlert>
            </Snackbar>
        </CustomBox>
    );
};

export default Login;