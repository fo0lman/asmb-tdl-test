import {
    READ_TODOS,
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO,
    COMPLETE_ALL
} from '../constants';

import {addTodos} from '../actions';
import {getTodos} from '../selectors';

export default store => next => action => {
    switch (action.type) {
        case READ_TODOS: {
            next(action);
            try {
                const todos = JSON.parse(localStorage.getItem('todos')) || [];
                store.dispatch(addTodos(todos));
            } catch (exception) {
                console.error('Cannot parse todos from storage ', exception);
            }
            return;
        }
        case ADD_TODO:
        case REMOVE_TODO:
        case TOGGLE_TODO:
        case COMPLETE_ALL:
            next(action);
            localStorage.setItem('todos', JSON.stringify(getTodos(store.getState())));
            return;
        default : {
            next(action);
        }
    }
};
