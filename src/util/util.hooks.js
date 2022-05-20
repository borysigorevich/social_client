import {useContext, useState} from "react"
import {useNavigate} from 'react-router-dom'
import {useMutation} from "@apollo/client";
import {AuthContext} from "../context/auth";
import {GET_POSTS} from "./graphql";

export const useAuth = (credentials, query, type, handleOpenSuccess) => {
    const [userCredentials, setUserCredentials] = useState(credentials)
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const {login, user} = useContext(AuthContext)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false)
    }

    const [submit, {loading}] = useMutation(query, {
        update: (proxy, {data}) => {
            if (type === 'createPost') {
                error && setError('')
                const cache = proxy.readQuery({query: GET_POSTS})
                const newData = {getPosts: [data[type], ...cache.getPosts]}
                proxy.writeQuery({query: GET_POSTS, data: newData})
                setUserCredentials({body: ''})
                handleOpenSuccess()
            } else if (type === 'deletePost') {
                error && setError('')
                const cache = proxy.readQuery({query: GET_POSTS})
                const newData = {getPosts: cache.getPosts?.filter(post => post.id !== data[type].id)}
                proxy.writeQuery({query: GET_POSTS, data: newData})
                handleOpenSuccess()
            } else if (type === 'likePost') {
                // const cache = proxy.readQuery({query: GET_POSTS})
                // const newData = {
                //     getPosts: cache.getPosts.map(post => {
                //         if (post.id === data.likePost.id) return data.likePost
                //         else return post
                //     })
                // }
                // proxy.writeQuery({query: GET_POSTS, data: newData})
            } else {
                login(data[type])
                navigate('/')
            }
        },
        onError: (errors) => {
            setError(errors.graphQLErrors[0]?.message)
            setOpen(true)
        }
    })

    const handleChange = event => {
        setUserCredentials(state => ({...state, [event.target.name]: event.target.value}))
    }

    const handleSubmit = async () => {
        await submit({variables: userCredentials})
    }

    return {
        userCredentials,
        error,
        open,
        loading,
        user,
        submit,
        handleChange,
        handleSubmit,
        handleClose
    }
}
