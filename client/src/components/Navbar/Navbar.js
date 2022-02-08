import React, { useState, useEffect } from 'react'
import {AppBar, Avatar, Button, Toolbar, Typography, Grid} from '@material-ui/core'
import useStyles from './Style'
import memories from '../../images/memories.png'
import {Link, useLocation, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'

function Navbar() {
    const classes = useStyles();
    const [user, setUser] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const logout =()=>{
        dispatch({type: "LOGOUT"})
        setUser(null);
        history.push('/auth');
    }

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])
   
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <div className={classes.brandContainer}>
                            <Typography component={Link} to="/" className= {classes.heading} variant="h2" align="center">Memories</Typography>
                            <img className = {classes.image} src={memories} alt="memories" height="60"/>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Toolbar className={classes.toolbar}>
                            {!user?
                                <Button component={Link} to="/auth" className={classes.purple}>SIGN IN</Button>:
                                <div className={classes.profile}>
                                <Avatar src={user.obj?.imageUrl}></Avatar>
                                <Typography>{user.obj?user.obj.name:user.result.name}</Typography>
                                <Button className={classes.purple} onClick={logout}>LOGOUT</Button>
                                </div>
                            }
                        </Toolbar>

                    </Grid>
                    
                
                </Grid>
                
        </AppBar>
    )
}

export default Navbar
