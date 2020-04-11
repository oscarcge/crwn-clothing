import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
// components
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SingInAndSignUpPage from './components/signin-signup/signin-signup.component';
// google authentication
import { auth, createUserProfileDocument } from './firebase/firebase.utils'; 

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }
  
  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      createUserProfileDocument(userAuth);

      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        
        userRef.onSnapshot( snapShot => {
          this.setState({
            id: snapShot.id,
            ...snapShot.data() 
          });
          // para saber el usuario que esta logueadogit
          // console.log(this.state)
        });
        
      }
      this.setState({ currentUser: userAuth }); 

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
