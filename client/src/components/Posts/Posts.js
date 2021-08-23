import React from 'react'
import Post from './Post/Post'
import useStyles from './Styles'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress} from '@material-ui/core'

const Posts = ({setSelectedPostId}) => {
    const posts = useSelector((state)=>state.posts);
    const classes = useStyles()
    console.log("posts",posts);
    return (
        !posts.length?<CircularProgress/>:(
            <Grid className={classes.container} container alignItems = "stretch" spacing={3}>
                {
                    posts.map((post)=>(
                        <Grid item key={posts._id} xs= {12} sm={6}>
                            <Post post={post} setSelectedPostId={setSelectedPostId}/>
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}

export default Posts
