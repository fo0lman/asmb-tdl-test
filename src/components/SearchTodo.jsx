import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import styles from './SearchTodo.scss';

import { setSearch } from '../actions';

const SEARCH_DELAY_MLS = 500;

class SearchTodo extends Component {
    static propTypes = {
        setSearch: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.searchTimerId = null;
    }

    searchChangeHandler = event => {
        const searchString = event.target.value;

        clearTimeout(this.searchTimerId);

        this.searchTimerId = setTimeout(() => {
            this.props.setSearch(searchString);
        }, SEARCH_DELAY_MLS);
    };

    render() {
        return (
            <div className={styles.root}>
                <div className={styles.icon}>
                    <i className="fa fa-search" aria-hidden="true" />
                </div>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Search..."
                    onChange={this.searchChangeHandler}
                />
            </div>
        );
    }
}

export default connect(undefined, {setSearch})(SearchTodo);
