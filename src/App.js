import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shoppage.components';
import './pages/signinpage/signinpage.component'
import Header from './components/header/header.component';
import SignInPage from './pages/signinpage/signinpage.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';



class App extends React.Component {

  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }
  
  unsunbscribeFromAuth = null;

  componentDidMount(){
    //firebase method
    this.unsunbscribeFromAuth = auth.onAuthStateChanged(async user =>{ 
      //this.setState({currentUser: user})
      createUserProfileDocument(user);
      
    });
  }

  //when app closes, logout
  componentWillUnmount(){
    this.unsunbscribeFromAuth();
  }


  render(){
    return (
      <div>
      <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInPage} />
        </Switch>

      </div>
    );
  }
}

export default App;


