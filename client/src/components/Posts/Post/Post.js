import React,{ useState } from 'react'
import useStyles from './Styles'
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deletePost, updateLikes } from '../../../actions/posts';

const Post = ({ post,setSelectedPostId }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    
    // console.log("user?.org?.googleId===post.creator",user?.obj?.googleId);
    const Likes = () => {
        console.log("likes",post.likes.length);
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.obj?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image ={post.selectedFile} title={post.title}></CardMedia>
            <div className={classes.overlay}>
                <Typography variant="h6" >{post.name}</Typography>
                <Typography variant="body2" >{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
            {(user?.result?._id===post.creator||user?.obj?.googleId===post.creator)&&
                <Button style={{color: 'white'}} size="small" onClick={() => {
                    console.log("at Post",post._id);
                    setSelectedPostId(post._id)}}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            }
                
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" >{post.tags.map((tag)=>(`#${tag}`))}</Typography>
            </div>
            <CardContent>
               <Typography variant="h5" className={classes.title} gutterBottom>{post.message}</Typography>
           </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={user?false:true} onClick={
                    ()=>{dispatch(updateLikes(post._id))}}>
                    <Likes/>
                </Button>
                {(user?.result?._id===post.creator||user?.obj?.googleId===post.creator)&&
                    <Button size="small" color="primary" onClick={()=>{
                            console.log("DeletePost Clicked");
                            dispatch(deletePost(post._id))}}>
                        <DeleteIcon fontSize="small"></DeleteIcon>
                        DELETE
                    </Button>
                }
            </CardActions>
        </Card>
    )
}

export default Post
