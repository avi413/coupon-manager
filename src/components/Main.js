import React, { Component } from 'react'

import fire from '../firebase'
import Login from './Form/Login'
import CouponList from './CouponList'


export default class Main extends Component {
    state = {
        user : 1,
        loading : true
    }
    componentDidMount(){
        this.authListiner()
    }

    authListiner(){
        fire.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({user});
            }else{
                this.setState({user:null});
            }
        })
    }

    render(){
        return (<div>
            {!this.state.user ?
                (<Login />) : (<CouponList/>)
            }
            
        </div>   
        )
    };

}
