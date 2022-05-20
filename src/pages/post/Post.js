import React, {useContext, useState} from 'react';
import {useParams, useNavigate, Navigate} from 'react-router-dom'
import {gql, useMutation, useQuery} from "@apollo/client";
import {
    CircularProgress,
    Box,
    Card,
    CardHeader,
    CardContent,
    Typography,
    IconButton,
    TextField,
    Button
} from '@mui/material'
import {CustomCard} from "../home/Home.styles";
import {AuthContext} from "../../context/auth";
import {DELETE_POST, GET_POSTS} from "../../util/graphql";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";

const GET_POST = gql`
    query GetPost($postId: ID!){
        getPost(postId: $postId) {
            username
            id
            body
            likeCount
            commentCount
            createdAt
            comments {
                id
                createdAt
                username
                body
            }
            likes {
                username
                id
                createdAt
            }
        }
    }
`

const DELETE_COMMENT = gql`
    mutation DeleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            username
            id
            body
            likeCount
            commentCount
            createdAt
            comments {
                id
                createdAt
                username
                body
            }
            likes {
                username
                id
                createdAt
            }
        }
    }
`

const CREATE_COMMENT = gql`
    mutation CreateComment($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body){
            username
            id
            body
            likeCount
            commentCount
            createdAt
            comments {
                id
                createdAt
                username
                body
            }
            likes {
                username
                id
                createdAt
            }
        }
    }
`

const Post = () => {
    const {postId} = useParams()
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const [comment, setComment] = useState('')

    const {data, loading} = useQuery(GET_POST, {variables: {postId}})

    const [deletePost] = useMutation(DELETE_POST, {
        update: (proxy, {data}) => {
            const cache = proxy.readQuery({query: GET_POSTS})
            const newData = {getPosts: cache.getPosts.filter(post => post.id !== data.deletePost.id)}
            proxy.writeQuery({query: GET_POSTS, data: newData})
            navigate('/')
        },
        onError: () => {
        }
    })

    const [deleteComment] = useMutation(DELETE_COMMENT, {
        update: (proxy, {data}) => {
            // const cache = proxy.readQuery({query: GET_POST})
            console.log('update')
            proxy.writeQuery({query: GET_POST, data: {getPost: data.deleteComment}})
        }
    })

    const [createComment] = useMutation(CREATE_COMMENT, {
        update: (proxy, {data}) => {
            setComment('')
            proxy.writeQuery({query: GET_POST, data: {getPost: data.createComment}})
        }
    })

    if (!user) {
        return <Navigate to={'/'}/>
    }

    let {id, body, createdAt, username, comments, likes, likeCount, commentCount} = !loading && data.getPost

    console.log(comments)
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
        }}>
            {loading
                ? <CircularProgress/>
                : <CustomCard
                    id={id}
                    body={body}
                    createdAt={createdAt}
                    username={username}
                    likes={likes}
                    likeCount={likeCount}
                    commentCount={commentCount}
                    comments={comments}
                    singlePage
                    user={user.username}
                    handleDelete={deletePost}
                />}
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '15px', width: '50%'}}>
                <TextField
                    variant={'standard'}
                    label={'Your comment'}
                    value={comment}
                    onChange={event => setComment(event.target.value)}
                />
                <Button
                    onClick={() => createComment({variables: {postId: id, body: comment}})}
                    sx={{width: '200px', margin: '0 auto'}}
                    color={'primary'}
                    variant={'contained'}>Create comment</Button>
            </Box>
            {comments?.map(comment => (
                <Card key={comment.id} elevation={6} sx={{width: '50%'}}>
                    <CardHeader
                        title={comment.username}
                        subheader={moment(comment.createdAt).fromNow()}
                    />
                    <CardContent sx={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant={'body1'}>
                            {comment.body}
                        </Typography>
                        {user.username === username && <IconButton
                            onClick={() => deleteComment({variables: {postId: id, commentId: comment.id}})}
                            variant={'outlined'}
                            color={'error'}
                            sx={{marginLeft: 'auto'}}
                        >
                            <DeleteIcon/>
                        </IconButton>}
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default Post;