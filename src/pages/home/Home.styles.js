import {
    Box,
    Card,
    CardHeader,
    Avatar,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    ButtonGroup,
    Button,
} from '@mui/material'
import {styled} from '@mui/material/styles'
import ForumIcon from '@mui/icons-material/Forum';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment";
import LikeButton from "./LikeButton";

export const CustomCard = styled(({
                                      theme,
                                      id,
                                      body,
                                      createdAt,
                                      username,
                                      comments,
                                      likes,
                                      likeCount,
                                      commentCount,
                                      children,
                                      likePost,
                                      likeComment,
                                      handleComment,
                                      handleDelete,
                                      user,
                                      singlePage,
                                      ...rest
                                  }) => (
    <Card {...rest} elevation={6}>
        <CardHeader title={username} subheader={moment(createdAt).fromNow(true)} avatar={<Avatar/>}/>
        <CardContent>
            <Typography>{body}</Typography>
        </CardContent>
        <CardActions>
            <LikeButton id={id} likePost={likePost} likeCount={likeCount} likes={likes}/>
            <ButtonGroup variant={'outlined'} color={'primary'} size={'small'} onClick={likeComment}>
                <Button startIcon={<ForumIcon/>} onClick={() => {
                    if (!singlePage) handleComment(id)
                }}/>
                <Button>{commentCount}</Button>
            </ButtonGroup>
            {user === username &&
                <IconButton
                    variant={'outlined'}
                    color={'error'}
                    sx={{marginLeft: 'auto'}}
                    onClick={() => handleDelete({variables: {postId: id}})}>
                    <DeleteIcon/>
                </IconButton>}
        </CardActions>
    </Card>))`
  color: #000;
  width: ${props => props.singlePage ? '50%' : '31%'};
`

export const CustomBox = styled(({loading, children, theme, ...rest}) => <Box {...rest}>{children}</Box>)`
  display: flex;
  justify-content: ${props => props.loading ? 'center' : 'start'};
  flex-wrap: wrap;
  gap: 35px;
`
