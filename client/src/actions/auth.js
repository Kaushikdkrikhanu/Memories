
import * as api from '../api';

export const signIn = (formData,router,setError)=> async (dispatch) =>{
    try{
        const {data} = await api.signin(formData);

        dispatch({type: "AUTH", data});
        router.push('/');   
    }catch(error){
        console.log(error.response.data.message);
        setError({message: error.response.data.message});
    }
}

export const signUp = (formData,router,setError)=> async (dispatch) =>{
    console.log("signup");
    try{
        const {data} = await api.signup(formData);
        
        dispatch({type: "AUTH", data});
        router.push('/');   
    }catch(error){
        console.log(error.response.data.message);
        setError({message: error.response.data.message});
    }
}
