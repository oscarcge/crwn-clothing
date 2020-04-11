import React from 'react';
import SignIn from '../signin/signin.component';
import SignUp from '../signup/signup.component';

import './signin-signup.style.scss';

const SingInAndSignUpPage = () => (
    <div className="sign-in-and-sign-up">
        <SignIn />        
        <SignUp />        
    </div>
)

export default SingInAndSignUpPage;
