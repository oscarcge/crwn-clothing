import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
// redux
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';

// import { setCurrentUser } from './redux/user/user.actions';
// components
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SingInAndSignUpPage from './components/signin-signup/signin-signup.component';
import CheckOutPage from './pages/checkout/checkout.component';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount(){
    const { checkUserSession } =  this.props 
    checkUserSession();

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
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
