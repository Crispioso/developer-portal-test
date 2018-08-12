import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import API from '../../utility/api';
import { UsersList } from './UsersList';
import Pagination from 'react-js-pagination';

import './userPagination.css';

const propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            applicationID: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
}

export class UsersController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetchingUsers: false,
            error: "",
            users: [],
            displayedUsers: [],
            numberOfPages: 0,
            resultsLimit: 10,
            currentPage: 1
        };
    }

    async componentWillMount() {
        this.setState({isFetchingUsers: true});

        const applicationID = this.props.match.params.applicationID;
        const allUsers = await this.getAllUsers(applicationID);

        this.setState({
            users: allUsers,
            numberOfPages: Math.floor(allUsers.length/this.state.resultsLimit),
            displayedUsers: this.getDisplayedUsers(allUsers, this.state.currentPage),
            isFetchingUsers: false
        });
    }

    getDisplayedUsers = (allUsers, page) => {
        const startOffset = (page-1)*this.state.resultsLimit;
        return allUsers.slice(startOffset, startOffset+this.state.resultsLimit);
    }

    getAllUsers = async (applicationID) => new Promise(resolve => {
        let allUsers = [];
        const getUsers = async (offset) => {
            const response = await API.getApplicationsUsers(applicationID, 25, offset);
            if (response.users.length === 0) {
                resolve(allUsers);
                return;
            }
            allUsers = [
                ...allUsers,
                ...response.users
            ];
            getUsers(offset+25);
        }

        getUsers(0);
    })

    handlePageChange = pageNumber => {
        this.setState({
            currentPage: pageNumber,
            displayedUsers: this.getDisplayedUsers(this.state.users, pageNumber)
        });
    }

    render() {
        return (
            <div>
                <h2>Users</h2>
                <Link to="/">&#60; Back to all applications</Link>
                {this.state.error &&
                    <p>{this.state.error}</p>
                }
                {this.state.isFetchingUsers ? 
                    <p>Loading application's users...</p>
                :
                    <UsersList users={this.state.displayedUsers}/>
                }
                {(!this.state.isFetchingUsers && this.state.users.length > 0) &&
                    <Pagination
                        totalItemsCount={this.state.users.length}
                        activePage={this.state.currentPage}
                        itemsCountPerPage={this.state.resultsLimit}
                        onChange={this.handlePageChange}
                    />
                }
            </div>
        )
    }
}

UsersController.propTypes = propTypes;

export default UsersController;