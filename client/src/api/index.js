import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'})
//all the required information for creating, updating posts such as name and id are being added to the token in the server and sent back.
//Here we are using that token which is being stored in the local storage for creating, updating posts and sending it back to the server,
//the server will be able to access this information by decoding the token 
API.interceptors.request.use((req)=>{
    //check is local storage has the details so that we pass the token only to post requests.
    
    if(localStorage.getItem('profile')){
        
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;

    }
    return req;

},function(error){
    return Promise.reject(error);
})
export const fetchPosts = ()=> API.get('/posts');
export const creatPosts = (newPost) =>API.post('/posts', newPost)
export const updatePosts = (post,id) => API.put(`/posts/${id}`, post)
export const deletePosts = (id) =>API.delete(`/posts/${id}`)
export const updateLikes = (id) => API.put(`/posts/${id}/likePost`)
export const signin = (formData) => API.post(`/user/signin`,formData);
export const signup = (formData) => API.post(`/user/signup`,formData);
