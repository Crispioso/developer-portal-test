import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.css';
import Auth from './utility/auth';

class App extends Component {
    constructor() {
        super();

        this.state = {
            isAuthenticating: false
        }
    }

    async componentWillMount() {
        this.setState({isAuthenticating: true});
        const isAuthenticated = await Auth.isAuthenticated().catch(error => {
            console.error("Error trying to check authentication", error);
            // TODO replace with the proper browse history API
            window.location.href = `${window.location.origin}${process.env.PUBLIC_URL}/login`;
        });
        
        if (!isAuthenticated) {
            // TODO replace with the proper browse history API
            window.location.href = `${window.location.origin}${process.env.PUBLIC_URL}/login`;
            return;
        }

        this.setState({isAuthenticating: false});
    }

    render() {
        if (this.state.isAuthenticating) {
            return "";
        }

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Developer portal
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className="main">
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default App;
