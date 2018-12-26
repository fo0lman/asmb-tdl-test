import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'connected-react-router/immutable';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import todosMiddleware from '../middlewares/todos';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState = {}, history) {
    const middlewares = [
        thunk,
        todosMiddleware,
        routerMiddleware(history)
    ];

    const enhancers = [
        applyMiddleware(...middlewares),
    ];

    return createStore(
        rootReducer(history),
        initialState,
        composeEnhancer(...enhancers)
    );
}
