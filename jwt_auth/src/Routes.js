import React from 'react'
import { Switch, Route } from 'react-router-dom'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Profile from './components/profile'
import Shared from './components/Shared'


export default function Routes(){
    return(
        

            <Switch>
                <Route  path='/' exact component={SignIn}/>
                <Route path='/signup' component={SignUp}/>
                <Route path='/:name' exact> <Profile /></Route>
                <Route path='/:name/shared'> <Shared /></Route>
               

            </Switch>
       
       

       
    )
}