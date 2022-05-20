import React, {useContext, useState} from 'react';
import {useQuery} from "@apollo/client";
import {CustomBox, CustomCard} from "./Home.styles";
import {Box, CircularProgress, Typography, Snackbar} from "@mui/material";
import {Navigate, useNavigate} from "react-router-dom";
import PostForm from "../../components/postForm/PostForm";
import {DELETE_POST, GET_POSTS} from "../../util/graphql";
import {useAuth} from "../../util/util.hooks";
import {CustomAlert} from "../../customComponents";

const Home = () => {
    const [openSuccess, setOpenSuccess] = useState(false)
    const {data, loading} = useQuery(GET_POSTS)
    const navigate = useNavigate()

    const handleOpenSuccess = () => setOpenSuccess(true)
    const handleCloseSuccess = (_, reason) => {
        if(reason === 'clickaway') return
        setOpenSuccess(false)
    }
    console.log(data)
    const {open: openError, submit, user, handleClose: handleCloseError} = useAuth({}, DELETE_POST, 'deletePost', handleOpenSuccess)

    if (!user) return <Navigate to={'/login'}/>

    const likePost = () => {
        console.log('post liked')
    }

    const likeComment = () => {
        console.log('comment liked')
    }

    const handleComment = postId => {
        navigate(`/posts/${postId}`)
    }

    return (
        <Box>
            <Box sx={{textAlign: 'center'}}><Typography variant={'h3'} sx={{mb: '20px'}}>Recent Posts</Typography></Box>
            {user && <PostForm/>}
            <CustomBox loading={loading}>
                {loading
                    ? <CircularProgress/>
                    : data?.getPosts.map(({
                                              id,
                                              body,
                                              createdAt,
                                              username,
                                              comments,
                                              likes,
                                              likeCount,
                                              commentCount
                                          }) => (
                        <CustomCard
                            key={id}
                            id={id}
                            body={body}
                            createdAt={createdAt}
                            username={username}
                            comments={comments}
                            likes={likes}
                            likeCount={likeCount}
                            likePost={likePost}
                            likeComment={likeComment}
                            handleComment={handleComment}
                            user={user?.username}
                            handleDelete={submit}
                            commentCount={commentCount}/>
                    ))
                }
                <Snackbar open={openSuccess} autoHideDuration={4000} onClose={handleCloseSuccess}>
                    <CustomAlert severity={'success'} onClose={handleCloseSuccess}>Post was successfully deleted</CustomAlert>
                </Snackbar>
                <Snackbar open={openError} autoHideDuration={4000} onClose={handleCloseError}>
                    <CustomAlert severity={'error'} onClose={handleCloseError}>Error</CustomAlert>
                </Snackbar>
            </CustomBox>
        </Box>
    );
};

export default Home;
