import React, { Component } from 'react';
import API from '../../utility/api';
import { ApplicationsList } from './ApplicationsList';

export class ApplicationsController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetchingApplications: false,
            error: "",
            applications: []
        };
    }

    async componentWillMount() {
        this.setState({isFetchingApplications: true});

        const response = await API.getApplications().catch(error => {
            // 401 is handle by central http function so we don't need to do anything here
            if (error.status === 401) {
                return;
            }

            this.setState({
                error: "Error trying to get the list of applications",
                isFetchingApplications: false
            });
            console.error("Error fetching list of applications", error);
        });

        this.setState({
            applications: response.apps,
            isFetchingApplications: false
        });
    }

    render() {
        return (
            <div>
                <h2>Applications</h2>
                {this.state.error &&
                    <p>this.state.error</p>
                }
                {this.state.isFetchingApplications ? 
                    <p>Loading applications...</p>
                :
                    <ApplicationsList applications={this.state.applications} />
                }
            </div>
        )
    }
}

export default ApplicationsController;