import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';


import './signup.style.scss';


const SignUp = ({ signUpStart }) => {
    const[userData, setUserData ] = useState({displayName: '', email: '', password: '', confirmPassword: ''});

    const { displayName, email, password, confirmPassword } = userData;
    
    const handleSubmit = async event => {
        event.preventDefault();
        
        if(password !== confirmPassword) {
            alert("password don't match");
            return;
        }
        signUpStart({ email, password, displayName });
        
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name] : value });
    }

    return(
        <div className="sign-up">
            <h2 className="title"> I do not have an account</h2>
            <span>Sign up with your email and password</span>

            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="displayName"
                    defaultValue={displayName}
                    onChange={handleChange}
                    label="Display Name"
                    required
                />
                    <FormInput
                    type="email"
                    name="email"
                    defaultValue={email}
                    onChange={handleChange}
                    label="Email"
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                    defaultValue={password}
                    onChange={handleChange}
                    label="Password"
                    required
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    defaultValue={confirmPassword}
                    onChange={handleChange}
                    label="Confirm Password"
                    required
                />
                
                <CustomButton type="submit">SIGN UP</CustomButton>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})


export default connect(null, mapDispatchToProps)(SignUp);