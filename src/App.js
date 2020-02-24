import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shoppage.components';
import './pages/signinpage/signinpage.component'
import Header from './components/header/header.component';
import SignInPage from './pages/signinpage/signinpage.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';



class App extends React.Component {

  
  unsunbscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
    //firebase method
    this.unsunbscribeFromAuth = auth.onAuthStateChanged(async userAuth => { 
      //this.setState({currentUser: user})
      //createUserProfileDocument(user);'=
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        
        //update current user
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
            }
          );
        });
      }
      else{ //if no user Auth
        this.setState({currentUser: userAuth});
      }
    });
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
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInPage} />
        </Switch>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null,mapDispatchToProps)(App);


