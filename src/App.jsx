import React from 'react';
import {hot} from 'react-hot-loader';
import PropTypes from 'prop-types';
import {ConnectedRouter} from 'connected-react-router/immutable';

import routes from './routes';

const App = ({history}) => {
    return (
        <ConnectedRouter history={history}>
            {routes}
        </ConnectedRouter>
    );
};

App.propTypes = {
    history: PropTypes.object,
};

export default hot(module)(App);
