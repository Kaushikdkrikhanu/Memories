import React from 'react'
import {Container} from '@material-ui/core'
import NavBar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Auth from './components/Auth/Auth.js'
function App() {
    
    return (
        <Container maxWidth="lg">
            <Router>
                <NavBar/>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/auth">
                    <Auth/>
                </Route>    
            </Router>            
             
        </Container>
    )
}

export default App;
