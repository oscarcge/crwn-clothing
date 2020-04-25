import React from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component';

import { googleSingInStart, emailSingInStart } from '../../redux/user/user.actions';


import './signin.style.scss';
class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { emailSingInStart } = this.props;
        const { email, password } = this.state; 

        emailSingInStart(email, password);


    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value});
    }

    render() {
        const { googleSingInStart } = this.props;
        
        return (
            <div className="sign-in">
                <h2>I alredy have an account </h2>
                <span>Sign in with your email and password</span>
            
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name="email"
                        type="email"
                        defaultValue={this.state.email} 
                        handleChange={this.handleChange}
                        label="Email"
                        required />
                    <FormInput 
                        name="password"
                        type="password"
                        defaultValue={this.state.password} 
                        label="Password"
                        handleChange={this.handleChange}
                        required />  

                    <div className="buttons">
                        <CustomButton type="submit" value="Submit Form" >Sign In</CustomButton>
                        <CustomButton type="button" onClick={googleSingInStart} isGoogleSignIn >Sign In With Google</CustomButton>
                    </div> 

                </form>

            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    googleSingInStart: () => dispatch(googleSingInStart()),
    emailSingInStart: (email, password) => dispatch(emailSingInStart({ email, password}))
})
export default connect(null,mapDispatchToProps)(SignIn);
