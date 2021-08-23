import * as api from '../api';

export const getPosts = ()=> async(dispatch)=>{
    
    try{
        const {data} = await api.fetchPosts();
        console.log(data);
        dispatch({type: 'FETCH_ALL', payload: data});
    }catch(error){
        console.log("getPosts: ",error.response?.data.message);
    }


}

export const createPost = (post) => async(dispatch) =>{
    try{
        const {data} = await api.creatPosts(post);
        dispatch({type: 'CREATE', payload: data})
    } catch(error){
        console.log(error)
    }
}

export const updatePost = (post,postId) => async(dispatch) =>{
    try{
        const {data} = await api.updatePosts(post,postId)
        // console.log("actions",data);
        dispatch({type: 'UPDATE', payload: data})
    } catch(error){
        console.log(error);
    }
}

export const deletePost = (postId) => async(dispatch)=>{
    try{
        await api.deletePosts(postId)
        dispatch({type: 'DELETE', payload: postId})
    } catch(error){
        console.log(error);
    }
}

export const updateLikes = (postId) => async(dispatch)=>{
    try{
        console.log("updateLikes");
        const {data} = await api.updateLikes(postId);
        
        dispatch({type: 'LIKES', payload: data})
    } catch(error){
        console.log("likesss");
        console.log(error);
    }
}