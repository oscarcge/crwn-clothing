import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
// components
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SingInAndSignUpPage from './components/signin-signup/signin-signup.component';
// google authentication
import { auth } from './firebase/firebase.utils'; 

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }
  
  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
      console.log("FIREBASE USER INFO: ", user);
    }) 
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route  path="/shop" component={ShopPage} />
          <Route  path="/signin" component={SingInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
