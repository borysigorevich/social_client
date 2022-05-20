import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./pages/home/Home";
import {ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import {Box, GlobalStyles, ThemeProvider} from '@mui/material'
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Navbar from "./components/navbar/Navbar";
import {theme} from "./theme";
import {AuthContextProvider} from "./context/auth";
import Post from "./pages/post/Post";

const globalStyles = {
    '*': {
        padding: 0,
        margin: 0,
        boxSizing: 'border-box',
    },
    a: {
        color: '#fff',
        textDecoration: 'none',
    }
}

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken')
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
})


function App() {
    const client = new ApolloClient({link: authLink.concat(httpLink), cache: new InMemoryCache()})
    console.log('render app')
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <AuthContextProvider>
                    <GlobalStyles styles={globalStyles}/>
                    <BrowserRouter>
                        <Navbar/>
                        <Box sx={{maxWidth: '1067px', margin: '0 auto', mt: '50px', pb: 4}}>
                            <Routes>
                                <Route path={'/'} element={<Home/>}/>
                                <Route path={'/login'} element={<Login/>}/>
                                <Route path={'/register'} element={<Register/>}/>
                                <Route path={'/posts/:postId'} element={<Post/>}/>
                            </Routes>
                        </Box>
                    </BrowserRouter>
                </AuthContextProvider>
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default App;
