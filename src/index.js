import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import Immutable from 'immutable';

import App from './App.jsx';
import configureStore from './store';
import * as serviceWorker from './serviceWorker';

import {extractSession} from './utils/session';
import {restoreAuth} from './actions';

import 'normalize.css';
import 'font-awesome/scss/font-awesome.scss';

import './assets/styles/index.css';

const history = createBrowserHistory();
const initialState = Immutable.Map();

const store = configureStore(initialState, history);

const initApp = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App history={history}/>
        </Provider>,
        document.getElementById('root'),
    );
};

initApp();

const startApp = () => {
    const session = extractSession();

    session ? store.dispatch(restoreAuth(session)).then(() => initApp()) : initApp();
};

startApp();

serviceWorker.register();
