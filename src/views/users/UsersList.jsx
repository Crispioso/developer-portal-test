import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const propTypes = {
    users: PropTypes.array.isRequired
};

export class UsersList extends Component {

    renderUser(user) {
        return (
            <Card>
                <CardContent>
                    <Typography variant="headline" component="h2">
                        {user.name}
                    </Typography>
                    <Typography component="p" color="textSecondary">
                        {user.email}
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    render () {
        return (
            <ul className="card-list">
                {this.props.users.map(user => (
                    <li className="card-list__item" key={user.id}>
                        {this.renderUser(user)}
                    </li>
                ))}
            </ul>
        )
    }
}

UsersList.propTypes = propTypes;

export default UsersList;