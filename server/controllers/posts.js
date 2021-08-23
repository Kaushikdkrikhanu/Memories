
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req,res) =>{
    try {
        const postMessages = await PostMessage.find();
       // console.log("postMssages",postMessages);

        res.status(200).json(postMessages)
    } catch (e) {
        res.status(404).json({message: e.message})
    }
}

export const createPosts = async (req, res)=>{
    const body = req.body;
    const newPost = new PostMessage({...body,creator: req.userId});
    try {
        await newPost.save();

        res.status(201).json(newPost)
    } catch (e) {
        res.status(409).json({message: error.message})
    }
}

export const updatePosts = async (req, res)=>{
    const body = req.body;
    const {id} = req.params;
    try {
        await PostMessage.findByIdAndUpdate(id,body,{new: true},function(err,post){
            if(err){
                console.log(err);
            }
            if(post){
                res.status(201).json(post);
            }
        });
        
    } catch(e){
        res.status(409).json({message: e.message});
    }   
}

export const deletePosts = async (req,res)=>{
    const {id} = req.params;
    try {
        await PostMessage.findByIdAndDelete(id);
        res.status(200).json("Deletion Successfull");
    }
    catch(error){
        console.log(error);
        res.status(409).json({message: error.message});
    }
}

export const likePost = async (req,res) =>{
    const {id} = req.params;
    
    if(!req.userId){
        return res.status(401).json({message: "Unauthenticated"});
    }

    const post = await PostMessage.findById(id);
    
    const index = post.likes.findIndex((id)=>id===String(req.userId));
    console.log("index",index);
    if(index===-1){
        post.likes.push(req.userId);
        //console.log("post",post);
    }
    else{
        post.likes = post.likes.filter(id=>id!==req.userId);
        console.log('id',post.likes[0]);
        console.log('string',req.userId);
        console.log('post',post);
    }

    const updatePost = await PostMessage.findByIdAndUpdate(id,post,{new: true});
    res.status(200).json(updatePost);

}
