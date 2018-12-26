import {createSelector} from 'reselect';

const getFilteredTodos = (todos, filter) => {
    switch (filter) {
        case 'all':
            return todos;

        case 'completed':
            return todos.filter(todo => todo.get('completed'));

        case 'new':
            return todos.filter(todo => !todo.get('completed'));

        default:
            return todos;
    }
};

const getSearchedTodos = (todos, filter, search) => {
    const filteredTodos = getFilteredTodos(todos, filter);
    const query = search.get('text').trim().toLowerCase();
    const tags = search.get('tags');

    return !query && !tags.size ? filteredTodos : filteredTodos.filter(todo => {
        const todoName = todo.get('text').toLowerCase();
        const todoTags = todo.get('tags');

        return query && todoName.includes(query) || tags.size && todoTags.isSuperset(tags);
    });
};

export const getTodos = state => state.getIn(['todos', 'currentState']);
export const getSearch = state => state.get('search');

export const getVisibleTodos = filter => createSelector(
    [getTodos, getSearch],
    (todos, search) => getSearchedTodos(todos, filter, search)
);
