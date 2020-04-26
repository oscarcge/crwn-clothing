import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component';

import { googleSingInStart, emailSingInStart } from '../../redux/user/user.actions';

import './signin.style.scss';


const SignIn = ({ emailSingInStart, googleSingInStart }) => {
   const [userCredentials, setCredentials ] = useState({ email: '', password: '' })

   const { email, password } = userCredentials; 

   const handleSubmit = async event => {
        event.preventDefault();


        emailSingInStart(email, password);


    }

    const handleChange = event => {
        const { value, name } = event.target;

        setCredentials({...userCredentials, [name]: value});
    }

        
        return (
            <div className="sign-in">
                <h2>I alredy have an account </h2>
                <span>Sign in with your email and password</span>
            
                <form onSubmit={handleSubmit}>
                    <FormInput 
                        name="email"
                        type="email"
                        defaultValue={email} 
                        handleChange={handleChange}
                        label="Email"
                        required />
                    <FormInput 
                        name="password"
                        type="password"
                        defaultValue={password} 
                        label="Password"
                        handleChange={handleChange}
                        required />  

                    <div className="buttons">
                        <CustomButton type="submit" value="Submit Form" >Sign In</CustomButton>
                        <CustomButton type="button" onClick={googleSingInStart} isGoogleSignIn >Sign In With Google</CustomButton>
                    </div> 

                </form>

            </div>
        )
}
const mapDispatchToProps = dispatch => ({
    googleSingInStart: () => dispatch(googleSingInStart()),
    emailSingInStart: (email, password) => dispatch(emailSingInStart({ email, password}))
})
export default connect(null,mapDispatchToProps)(SignIn);
