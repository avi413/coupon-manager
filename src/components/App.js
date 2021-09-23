import React from 'react';
import { withTranslation  } from 'react-i18next';
import Header from './Header'
import Error from './404'
import Main from './Main'
import Footer from './Footer'
import Register from './Form/Register'
import fire from '../firebase'
import Spinner from '../assets/loader.gif'
//react router
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import AddCoupon from './Form/AddCoupon';
import RessetPassword from './Form/RessetPassword';
import AddCouponFromSms from './Form/AddCouponFromSms'
import ProductList from './ProductList'
import BussinessList from './BussinessList'
import './App.css'



class  App extends React.Component {

    state = {
        value: "he",
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

  render () {
   
    if(this.state.user === 1){
      return (
        <div className="mainBlock">
          <div className="sppiner">
            <img src={Spinner} alt="spinner" className="ImgSpinner" />
          </div>
        </div>
      )
    }
    return (
      <Router>
         <div className="App" dir='rtl'>
         {!this.state.user ?
                ('') : (<Header />)
            }
        <Switch>
          <Route exact path="/">
              <Main />
          </Route>
          
          <Route exact path="/addsms">
          {this.state.user ?
                (<AddCouponFromSms />) : (<Redirect to="/" />)
          }
          </Route>
          <Route exact path="/resset-password">
          <RessetPassword />
          </Route>
          <Route  exact path="/add">
          {this.state.user ?
                (<AddCoupon />) : (<Redirect to="/" />)
          }
          </Route>
          <Route exact path="/register">
          {!this.state.user ?
                (<Register />) : (<Redirect to="/" />)
          }
          </Route>
          <Route  exact path="/product-list">
          {this.state.user ?
                (<ProductList />) : (<Redirect to="/" />)
          }
          </Route>
          <Route  exact path="/bussiness-list">
          {this.state.user ?
                (<BussinessList />) : (<Redirect to="/" />)
          }
          </Route>
          <Route path="*">
              <Error />
          </Route>
        </Switch>
        <Footer/>
        </div>
      </Router>
    );
  }
}
export default withTranslation()(App);
