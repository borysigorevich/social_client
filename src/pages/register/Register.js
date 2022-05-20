import {TextField, Typography, Stack, Button, Snackbar, CircularProgress} from '@mui/material'
import {gql} from '@apollo/client'
import {CustomAlert, CustomBox} from "../../customComponents";
import {useAuth} from "../../util/util.hooks";
import {Navigate} from "react-router-dom";

const REGISTER = gql`
    mutation Register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(registerInput: {
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword}
        ) {
            id
            email
            username
            token
            createdAt
        }
    }
`

const initialCredentials = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const Register = () => {
    const {
        userCredentials,
        error,
        open,
        loading,
        user,
        handleChange,
        handleSubmit,
        handleClose
    } = useAuth(initialCredentials, REGISTER, 'register')

    if (user) return <Navigate to={'/'}/>

    return (
        <CustomBox>
            <Typography variant={'h4'} mb={3}>Register</Typography>
            <Stack spacing={2} width={300} mb={4}>
                <TextField
                    variant={'standard'}
                    label={'Username'}
                    name={'username'}
                    value={userCredentials.username}
                    onChange={handleChange}
                />
                <TextField
                    variant={'standard'}
                    label={'Email'}
                    name={'email'}
                    value={userCredentials.email}
                    onChange={handleChange}
                />
                <TextField
                    variant={'standard'}
                    label={'Password'}
                    name={'password'}
                    value={userCredentials.password}
                    onChange={handleChange}
                    type={'password'}
                />
                <TextField
                    variant={'standard'}
                    label={'ConfirmPassword'}
                    name={'confirmPassword'}
                    value={userCredentials.confirmPassword}
                    onChange={handleChange}
                    type={'password'}
                />
            </Stack>
            {loading
                ? <CircularProgress/>
                : <Button variant={'contained'} onClick={handleSubmit}>Register</Button>}
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <CustomAlert severity={'error'} onClose={handleClose}>{error}</CustomAlert>
            </Snackbar>
        </CustomBox>
    );
};

export default Register;
