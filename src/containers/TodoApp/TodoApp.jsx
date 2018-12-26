import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import TodoList from '../../components/TodoList.jsx';
import AddTodo from '../../components/AddTodo.jsx';
import SearchTodo from '../../components/SearchTodo.jsx';
import Actions from '../../components/Actions.jsx';
import Filter from '../../components/Filter.jsx';

import styles from './TodoApp.scss';

class TodoApp extends Component {
    static propTypes = {
        match: PropTypes.object
    };

    render() {
        return (
            <div className={styles.root}>
                <main className={styles.content}>
                    <div className={styles.user}>
                        <Link to="/logout">Logout</Link>
                    </div>
                    <h1 className={styles.logo}><i className="fa fa-tasks" /> To Do List</h1>
                    <AddTodo />
                    <Filter filter={this.props.match.params.filter}/>
                    <div className={styles.header}>
                        <SearchTodo />
                        <Actions />
                    </div>
                    <TodoList filter={this.props.match.params.filter}/>
                </main>
                <p className={styles.copyright}>Sergey Yarchuk &copy; 2018</p>
            </div>
        );
    }
}

export default TodoApp;
