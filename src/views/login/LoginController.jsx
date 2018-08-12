import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LoginForm from './LoginForm';
import Auth from '../../utility/auth';

export class LoginController extends Component {

    constructor() {
        super();
        
        this.state = {
            loginError: ""
        };
    }

    handleSubmit = async ({email, password}) => {
        if (!email || !password) {
            this.setState({
                loginError: "An email and password must be provided"
            })
            return;
        }

        const accessToken = await Auth.login(email, password).catch(errorMsg => {
            this.setState({loginError: errorMsg});
            return "";
        });

        if (accessToken) {
            Auth.setAccessToken(accessToken);
    
            // TODO this should be using the proper browser history API
            window.location.pathname = window.location.pathname.replace("login", "");
        }
    };

    render() {
        return (
            <Grid container direction="column" alignItems="center">
                <h2>Login</h2>
                <LoginForm
                    onSubmit={this.handleSubmit}
                    error={this.state.loginError}
                />
            </Grid>
        )
    }
}

export default LoginController;