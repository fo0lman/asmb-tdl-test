import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addTodo } from '../actions';

import styles from './AddTodo.scss';

const ENTER_KEY = 13;

class AddTodo extends Component {
    static propTypes = {
        addTodo: PropTypes.func.isRequired
    };

    state = {
        text: ''
    };

    handleTextChange = event => {
        this.setState({
            text: event.target.value
        });
    };

    keyDownHandler = event => {
        if (event.keyCode === ENTER_KEY) {
            this.addTodo();
        }
    };

    formSubmitHandler = event => {
        event.preventDefault();

        this.addTodo();
    };

    addTodo = () => {
        this.props.addTodo(this.state.text);
        this.setState({ text: '' });
    };

    render() {
        return (
            <div className={styles.root}>
                <form className={styles.form} onSubmit={this.formSubmitHandler}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Type a task here..."
                        value={this.state.text}
                        onChange={this.handleTextChange}
                        onKeyDown={this.keyDownHandler}
                        required
                    />

                    <button type="submit" className={styles.btn}>Add task</button>
                </form>
            </div>
        );
    }
}

export default connect(undefined, { addTodo })(AddTodo);
