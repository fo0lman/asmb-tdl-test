import {List, fromJS} from 'immutable';
import {tagsParser} from '../utils/tags';
import {
    ADD_TODOS,
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO,
    COMPLETE_ALL
} from '../constants';

const getIndex = (list, id) => list.findIndex(item => item.get('id') === id);

const initialState = List([]);

const restructureTodo = (todo, action) => {
    if (!!todo && todo.get('id') !== action.id) {
        return null;
    }

    const {text, tags} = tagsParser(action.text);

    return fromJS({
        id: action.id,
        text,
        tags,
        description: action.text,
        completed: !!todo && todo.get('completed')
    });
};

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODOS: {
            return state.merge(fromJS(action.todos));
        }

        case ADD_TODO: {
            return state.push(restructureTodo(null, action));
        }

        case REMOVE_TODO: {
            return state.delete(getIndex(state, action.id));
        }

        case TOGGLE_TODO: {
            return state.update(
                getIndex(state, action.id),
                item => item.set('completed', !item.get('completed'))
            );
        }

        case COMPLETE_ALL: {
            return state.map(item => item.set('completed', true));
        }

        default: {
            return state;
        }
    }
};

export default todosReducer;
