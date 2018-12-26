import {fromJS} from 'immutable';

import {
    AUTH_FAILURE,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_LOGOUT
} from '../constants';

const initialState = fromJS({
    isLoggingIn: false,
    isLoggedIn: false,
    error: null
});

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return state.set('isLoggingIn', true);

        case AUTH_SUCCESS:
            return state
                .set('isLoggingIn', false)
                .set('isLoggedIn', true);

        case AUTH_LOGOUT:
            return state
                .set('isLoggingIn', false)
                .set('isLoggedIn', false);

        case AUTH_FAILURE:
            return state
                .set('isLoggingIn', false)
                .set('isLoggedIn', false)
                .set('error', action.error);

        default:
            return state;
    }
};

export default sessionReducer;
