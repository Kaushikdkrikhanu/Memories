
export default (posts=[], action)=>{
    
    switch(action.type){
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...posts, action.payload]
        case 'UPDATE':{
            console.log("action.payload",action.payload);
            return posts.map((post)=>(post._id === action.payload._id?action.payload:post))
        }
        case 'DELETE': return posts.filter((post)=>post._id !== action.payload)      
        case 'LIKES':{
            console.log("action.payload",action.payload);
            return posts.map((post)=>(post._id === action.payload._id?action.payload:post))
        }
        default:
            return posts;
        
    }

    
}