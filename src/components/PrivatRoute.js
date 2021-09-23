import React, {useState} from 'react'
import { Route, Redirect } from 'react-router-dom'
import fire from '../firebase'

export default function PrivatRoute( {component: Component, ...rest} ) {
    
    const [correntUser, setCorrentUser] = useState();
    fire.auth().onAuthStateChanged((user) => {
        if(user){
            setCorrentUser(true) ; 
        }
        else{
           setCorrentUser(false) ;  
        }
    });
    console.log(correntUser)

    return (
        <Route
        {...rest}
        render={props => {
             correntUser ? <Component {...props} /> : <Redirect to="/" />
        }}
        >
            
        </Route>
    )
}
