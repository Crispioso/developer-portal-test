import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import { FormControl } from '../../../node_modules/@material-ui/core';

const propTypes = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
};

export class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPassword: false,
            email: "",
            password: "",
            isLoggingIn: false
        };
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    
    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit({
            email: this.state.email, 
            password: this.state.password
        });
    };
     
    handleMouseDownPassword = event => {
        event.preventDefault();
    };
    
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <Grid container direction="column">
                    <Grid item>
                        <TextField
                            id="email"
                            label="Email address"
                            onChange={this.handleChange("email")}
                            disabled={this.state.isLoggingIn}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                disabled={this.state.isLoggingIn}
                                type={this.state.showPassword ? "text" : "password"}
                                value={this.state.password}
                                onChange={this.handleChange("password")}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                    onMouseDown={this.handleMouseDownPassword}
                                    >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <div>
                            <Button disabled={this.state.isLoggingIn} variant="contained" color="primary" type="submit" className="button">
                                Submit
                            </Button>
                        </div>
                        {this.props.error &&
                            <p>{this.props.error}</p>
                        }
                    </Grid>
                </Grid>
            </form>
        )
    }
}

LoginForm.propTypes = propTypes;

export default LoginForm;