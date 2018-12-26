import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';

import {setFilter} from '../actions';

import styles from './FilterLink.scss';

class FilterLink extends Component {
    static propTypes = {
        filter: PropTypes.string.isRequired,
        current: PropTypes.string.isRequired,
        setFilter: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired,
        children: PropTypes.any
    };

    filterHandler = () => {
        const {filter} = this.props;

        this.props.setFilter(filter);
        this.props.push({
            pathname: `/todos/${filter}`,
        });
    };

    render() {
        const isActive = this.props.filter === this.props.current;
        const {children} = this.props;

        return (
            <li className={styles.root} onClick={this.filterHandler}>
                {
                    !isActive ?
                        <span className={styles.link}>{children}</span> :
                        <span className={styles.active}>{children}</span>
                }
            </li>
        );
    }
}

export default connect(undefined, {push, setFilter})(FilterLink);
