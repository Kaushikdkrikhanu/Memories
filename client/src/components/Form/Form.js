import React, {useState, useEffect} from 'react'
import useStyles from './Styles'
import FileBase from 'react-file-base64'
import { TextField, Button, Typography, Paper  } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { createPost,updatePost } from '../../actions/posts'
import { useSelector } from 'react-redux'

const Form = ({selectedPostId,setSelectedPostId}) => {
    const posts = useSelector((state)=>state.posts);
    const profile = JSON.parse(localStorage.getItem('profile'));
    const userName = profile?profile.result?profile.result.name:profile.obj.name:null;
    console.log("userName", userName);
    /*
    *setting the username and other fields 
    */
    const [postData, setPostData] = useState({
        name: userName, title: '', message: '', tags: '', selectedFile: ''
    })

    useEffect(()=>{
        if(selectedPostId!=0){
            const selectedPost = posts.find((post)=>post._id==selectedPostId);
            setPostData({
                
                title: selectedPost.title,
                message: selectedPost.message,
                tags: selectedPost.tags,
                selectedFile: selectedPost.selectedFile
            })
            console.log("PostData",selectedPost);
        }
        console.log("S_ElectedId", selectedPostId)
        
    },[selectedPostId])
    const classes = useStyles()
    const dispatch = useDispatch();
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!selectedPostId){
            dispatch(createPost(postData));
            clear();
        }
        else{
            dispatch(updatePost(postData,selectedPostId));
            setSelectedPostId(0);
            console.log("update Inititated")
            
            clear();
        }
        
    }

    const clear = ()=>{
        /*
        *setting the username again and clearing others
        */
            setPostData({
                name: userName, title: '', message: '', tags: '', selectedFile: '' 
            })
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Creatiing a Memory</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e)=>{setPostData({ ...postData, title: e.target.value })}}></TextField>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e)=>{setPostData({ ...postData, message: e.target.value })}}></TextField>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e)=>{setPostData({ ...postData, tags: e.target.value })}}></TextField>
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64})=> setPostData({ ...postData, selectedFile: base64})}>
                    </FileBase>
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" disabled={userName?false:true}  type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> 
            </form>
        </Paper>
    )
}

export default Form
