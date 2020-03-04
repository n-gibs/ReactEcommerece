import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shoppage.component';
import Header from './components/header/header.component';
import SignInPage from './pages/signinpage/signinpage.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from "./redux/user/user.selectors";



class App extends React.Component {
  
  unsunbscribeFromAuth = null;

  componentDidMount(){
    const { checkUserSession } = this.props;
    checkUserSession();
   
  }

  //when app closes, logout
  componentWillUnmount(){
    this.unsunbscribeFromAuth();
  }


  render(){
    return (
      <div>
      <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' 
          render={() =>
            this.props.currentUser ? 
            (<Redirect to='/'/>) 
            : 
            (<SignInPage/>)
            } 
          />
          <Route path='/checkout' component= {CheckoutPage}/>
        </Switch>

      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser

});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


