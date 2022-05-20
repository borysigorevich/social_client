import {createContext, useReducer} from "react";
import jwtDecode from 'jwt-decode'

export const AuthContext = createContext({
    user: null,
    login: data => {
    },
    logout: () => {
    },
})

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...action.payload}
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

let initialState = null

export const AuthContextProvider = ({children}) => {

    if(localStorage.getItem('jwtToken')) {
        const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))
        console.log(decodedToken)
        if(decodedToken.exp * 1000 < Date.now()) localStorage.removeItem('jwtToken')
        else initialState = decodedToken
    }
    const [user, dispatch] = useReducer(authReducer, initialState)

    const login = user => {
        localStorage.setItem('jwtToken', user.token)
        dispatch({type: 'LOGIN', payload: user})
    }
    const logout = () => {
        localStorage.removeItem('jwtToken')
        dispatch({type: 'LOGOUT'})
    }

    return <AuthContext.Provider value={{user, logout, login}}>
        {children}
    </AuthContext.Provider>
}
