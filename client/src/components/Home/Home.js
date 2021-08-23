import React, {useEffect, useState} from 'react'
import {Container, Grow, Grid} from '@material-ui/core'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import useStyles from '../Form/Styles'
import {useDispatch} from 'react-redux';
import {getPosts} from '../../actions/posts'

function Home() {
    const [selectedPostId, setSelectedPostId] = useState(0);
    const classes = useStyles()
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log("useEffect");
        dispatch(getPosts());
    },[dispatch])
    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setSelectedPostId={setSelectedPostId}/>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Form selectedPostId={selectedPostId} setSelectedPostId={setSelectedPostId}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
