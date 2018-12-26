import {combineReducers} from 'redux-immutable';
import {connectRouter} from 'connected-react-router/immutable';
import {AUTH_LOGOUT} from '../constants';
import {Map} from 'immutable';

import session from './session';
import todosReducer from './todos';
import actions from './actions';
import filter from './filter';
import search from './search';

const todos = actions(todosReducer);

const appReducer = history => combineReducers({
    session,
    todos,
    filter,
    search,
    router: connectRouter(history)
});

const rootReducer = history => (state, action) => {
    if (action.type === AUTH_LOGOUT) {
        state = Map({}); // eslint-disable-line no-param-reassign
    }
    return appReducer(history)(state, action);
};

export default rootReducer;
