import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilterLink from './FilterLink.jsx';

import styles from './Filter.scss';

export default class Filter extends Component {
    static propTypes = {
        filter: PropTypes.string,
    };

    render() {
        return (
            <ul className={styles.root}>
                <FilterLink current={this.props.filter} filter="all">All</FilterLink>
                <FilterLink current={this.props.filter} filter="new">New</FilterLink>
                <FilterLink current={this.props.filter} filter="completed">Completed</FilterLink>
            </ul>
        );
    }
}
