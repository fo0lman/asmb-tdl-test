import {
    READ_TODOS,
    ADD_TODOS,
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO,
    COMPLETE_ALL,
    SET_FILTER,
    SET_SEARCH,
    UNDO_ACTION,
    REDO_ACTION
} from '../constants';

export const readTodos = () => {
    return {
        type: READ_TODOS
    };
};

export const addTodos = todos => {
    return {
        type: ADD_TODOS,
        todos
    };
};

export const addTodo = text => {
    return {
        type: ADD_TODO,
        id: Date.now(),
        text
    };
};

export const toggleTodo = id => {
    return {
        type: TOGGLE_TODO,
        id
    };
};

export const removeTodo = id => {
    return {
        type: REMOVE_TODO,
        id
    };
};

export const completeAll = () => {
    return {
        type: COMPLETE_ALL
    };
};


export const setFilter = filter => {
    return {
        type: SET_FILTER,
        filter
    };
};

export const setSearch = search => {
    return {
        type: SET_SEARCH,
        search
    };
};

export const undoAction = () => {
    return {
        type: UNDO_ACTION
    };
};

export const redoAction = () => {
    return {
        type: REDO_ACTION
    };
};
