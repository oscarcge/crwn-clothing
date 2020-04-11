import React from 'react';
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component';

import './signin.style.scss';

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ email: '', password: ''});
    }

    handleSubmit = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value});
    }

    render() {
        return (
            <div className="sign-in">
                <h2>I alredy have an account </h2>
                <span>Sign in with your email and password</span>
            
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name="email" 
                        value={this.state.email} 
                        handleChange={this.handleChange}
                        label="Email"
                        required />
                    <FormInput 
                        name="password" 
                        value={this.state.password} 
                        label="Password"
                        handleChange={this.handleChange}
                        required />  

                    <CustomButton type="submit" value="Submit Form" >Sign In</CustomButton>

                </form>

            </div>
        )
    }
}

export default SignIn;
