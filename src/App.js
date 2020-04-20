import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
// redux
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';

import { setCurrentUser } from './redux/user/user.actions';
// components
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SingInAndSignUpPage from './components/signin-signup/signin-signup.component';
import CheckOutPage from './pages/checkout/checkout.component';
// google authentication

import { auth, createUserProfileDocument } from './firebase/firebase.utils'; 


class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      createUserProfileDocument(userAuth);

       if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        
        userRef.onSnapshot( snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data() 
          });
          // para saber el usuario que esta logueado
          // console.log(this.state)
        });
        
      }
      setCurrentUser( userAuth ); 

    }) 
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route  path="/shop" component={ShopPage} />
          <Route  path="/checkout" component={CheckOutPage} />
          <Route  exact path="/signin" render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SingInAndSignUpPage/>)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
