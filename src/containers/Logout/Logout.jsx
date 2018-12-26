import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import { unAuth } from '../../actions';

class Logout extends Component {
    static propTypes = {
        unAuth: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.unAuth();
    }

    render() {
        return (
            <Redirect to="/login" />
        );
    }
}

export default connect(undefined, { unAuth })(Logout);
