import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
    toggleTodo,
    removeTodo,
    readTodos
} from '../actions';

import {getVisibleTodos} from '../selectors';

import Todo from './Todo.jsx';
import styles from './TodoList.scss';

const mapStateToProps = (state, ownProps) => ({
    isLoggingIn: state.getIn(['session', 'isLoggingIn']),
    isLoggedIn: state.getIn(['session', 'isLoggedIn']),
    todos: getVisibleTodos(ownProps.filter)(state)
});

class TodoList extends Component {
    static propTypes = {
        isLoggingIn: PropTypes.bool.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        todos: PropTypes.object.isRequired,
        toggleTodo: PropTypes.func.isRequired,
        removeTodo: PropTypes.func.isRequired,
        readTodos: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.isLoggedIn && !this.props.isLoggingIn && this.props.readTodos();
    }

    toggleTodoHandler = id => () => {
        this.props.toggleTodo(id);
    };

    removeTodoHandler = id => () => {
        this.props.removeTodo(id);
    };

    renderAlert = () => {
        return <div className={styles.alert}>Tasks not found.</div>;
    };

    renderList(todos) {
        return todos.map(todo => (
                <Todo
                    key={todo.get('id')}
                    id={todo.get('id')}
                    text={todo.get('text')}
                    tags={todo.get('tags')}
                    description={todo.get('description')}
                    completed={todo.get('completed')}
                    onToggle={this.toggleTodoHandler(todo.get('id'))}
                    onRemove={this.removeTodoHandler(todo.get('id'))}
                />
            )
        );
    }

    render() {
        const {todos} = this.props;

        return (
            <div className={styles.root}>
                {
                    todos.size ?  this.renderList(todos) : this.renderAlert()
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, {toggleTodo, removeTodo, readTodos})(TodoList);
