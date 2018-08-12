import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import dateFormat from 'dateformat';

const propTypes = {
    applications: PropTypes.array.isRequired
};

export class ApplicationsList extends Component {

    renderCard(application) {
        return (
            <Card>
                <CardContent>
                    <Typography variant="headline" component="h2">
                        {application.name}
                    </Typography>
                    <Typography component="p" color="textSecondary">
                        Created: {dateFormat(application.created, "ddd dd mmm yyyy, h:MM:ss")}
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    render () {
        return (
            <ul className="card-list">
                {this.props.applications.map(application => (
                    <li className="card-list__item" key={application.id}>
                        <NavLink className="card-list__link" to={application.id}>
                            {this.renderCard(application)}
                        </NavLink>
                    </li>
                ))}
            </ul>
        )
    }
}

ApplicationsList.propTypes = propTypes;

export default ApplicationsList;