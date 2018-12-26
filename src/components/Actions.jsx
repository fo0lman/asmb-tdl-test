import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
    undoAction as undo,
    redoAction as redo,
    completeAll
} from '../actions';

import styles from './Actions.scss';

class Actions extends Component {
    static propTypes = {
        undo: PropTypes.func.isRequired,
        redo: PropTypes.func.isRequired,
        completeAll: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className={styles.root}>
                <button className={styles.complete} onClick={this.props.completeAll}>Complete All</button>
                <button className={styles.btn} onClick={this.props.undo}><i className="fa fa-undo" title="Undo" /></button>
                <button className={styles.btn} onClick={this.props.redo}><i className="fa fa-repeat" title="Redo" /></button>
            </div>
        );
    }
}

export default connect(undefined, {undo, redo, completeAll})(Actions);
