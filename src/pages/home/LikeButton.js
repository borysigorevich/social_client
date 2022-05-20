import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {useAuth} from "../../util/util.hooks";
import {LIKE_POST} from "../../util/graphql";

const LikeButton = ({id, likeCount, likes}) => {
    const {submit, user} = useAuth({}, LIKE_POST, 'likePost')
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)) setLiked(true)
        else setLiked(false)
    }, [user, likes])

    return (
        <ButtonGroup
            variant={'outlined'}
            color={'info'}
            size={'small'}
            onClick={() => submit({variables: {postId: id}})}
        >
            <Button variant={liked ? 'contained' : 'outlined'} startIcon={<FavoriteIcon/>}/>
            <Button>{likeCount}</Button>
        </ButtonGroup>
    );
};

export default LikeButton;