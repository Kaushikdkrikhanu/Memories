import { Avatar, Container, Paper, Typography, Grid, Button, Box } from '@material-ui/core'
import React, {useState} from 'react'
import useStyle from './Styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import Icon from './Icon'
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import {signIn, signUp} from '../../actions/auth';

function Auth() {
    let history = useHistory();
    
    const dispatch = useDispatch();
    const classes = useStyle();
    const [isSignUp, setIsSignUp] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({firstName: '', lastName: '',email: '', password: '', repeatPassword: ''});
    /* 
    *setError to enable view for incorrect password
    */
    const [error,setError] = useState({message: ""}); 
    const onSubmit = (e)=>{
        e.preventDefault();
        console.log("Submit");
        console.log(form);
        console.log("isSignUp",isSignUp);
        isSignUp?dispatch(signUp(form,history,setError)):dispatch(signIn(form,history,setError));
    }

    const handleChange = (e)=>{
        setForm({...form, [e.target.name]:e.target.value})
    }

    const handleShowPassword = ()=>{
        setShowPassword(!showPassword);
    }

    const googleSuccess = async (res)=>{
        const obj = res?.profileObj;
        const token = res?.tokenId;
        const data = {obj, token};
        try{
            dispatch({type: "AUTH", data})
            history.push('/');
        }
        catch(error){
            console.log("dispatch Error",error);
        }

    }

    const googleError = (error)=>{
        console.log("Google Sign in Failed. Try again ",error)
    }

    const switchMode = ()=>{
        setIsSignUp(!isSignUp);
        setShowPassword(false);
        setError({message:""});
    }


    return (
        <Container maxWidth="xs">
            {error.message&&<Paper variant="outlined" className={classes.error}>
                <Typography align="center" variant="subtitle2">{`${error.message}`}</Typography>
            </Paper>}
            <Paper className={`${!error.message?`${classes.paper} ${classes.marginTop}`:`${classes.paper}`}`}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">
                    {isSignUp?"Sign Up": "Sign In" }
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && 
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus halfSize/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} halfSize/> 
                            </>
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" autoFocus={!isSignUp}/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name="repeatPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                        <Button type="submit" color="primary" variant="contained" fullWidth className={classes.submit}>
                            {isSignUp?"SIGN UP":"SIGN IN"}
                        </Button>
                        <GoogleLogin 
                            clientId = "213043083450-7nkb6jco1bmv62c202kv546hk602n66g.apps.googleusercontent.com"
                            render = { (renderProps)=>(
                                <Button color="primary" onClick={renderProps.onClick} variant="contained" className={classes.googleButton} fullWidth disabled = {renderProps.disabled} startIcon={<Icon/>}>
                                    GOOGLE SIGN IN
                                </Button> 
                            )
                            }
                            onSuccess = {googleSuccess}
                            onFailure = {googleError}
                            cookiePolicy = {'single_host_origin'}                  
                        />
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp?"ALREADY HAVE AN ACCOUNT? SIGN IN":"DON'T HAVE AN ACCOUNT? SIGN UP"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            
        </Container>
    )
}

export default Auth
