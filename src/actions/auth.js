import api from '../api';
import {saveSession, clearSession} from '../utils/session';
import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    AUTH_LOGOUT
} from '../constants';

export const authSuccess = (token, user) => {
    saveSession(token);

    return {
        type: AUTH_SUCCESS,
        user: user,
        token: token
    };
};
export const unAuthSuccess = message => {
    clearSession();

    return {
        type: AUTH_LOGOUT,
        message
    };
};

export const restoreAuth = token => dispatch => {
    return api.checkAuth(token)
        .then(
            data => (
                dispatch(authSuccess(token, data))
            )
        );
};

export const auth = (login, password) => dispatch => {
    dispatch({
        type: AUTH_REQUEST,
    });

    return api.auth(login, password)
        .then(
            data => (
                dispatch(authSuccess(data.token, data.user))
            ),
            error => (
                dispatch({
                    type: AUTH_FAILURE,
                    error
                })
            ),
        );
};

export const unAuth = () => dispatch => {
    dispatch({
        type: AUTH_REQUEST,
    });

    return api.unAuth()
        .then(
            data => (
                dispatch(unAuthSuccess(data.message))
            ),
            error => (
                dispatch({
                    type: AUTH_FAILURE,
                    error
                })
            ),
        );
};
