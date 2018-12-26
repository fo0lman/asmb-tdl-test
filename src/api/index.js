import {getToken, decodeToken} from '../utils/token';
import USERS from '../assets/json/users.json';
import {SECRET} from '../constants';

export function auth(login, password) {
    return new Promise((resolve, reject) => {
        const user = USERS.find(usr => usr.login === login);

        if (!user) {
            return reject('User does not exist. Try to type another credentials.');
        }

        if (user.password !== password) {
            return reject('Pasword is incorrect');
        }

        return resolve({
            user,
            token: getToken(user, SECRET)
        });
    });
}

export function unAuth() {
    return new Promise(resolve => resolve({message: 'Logout success.'}));
}

export function checkAuth(token) {
    return new Promise((resolve, reject) => {
        if (!token) {
            return reject('User is not authentificated');
        }

        const decodedUser = decodeToken(token, SECRET);
        const loggedInUser = USERS.find(usr => usr.login === decodedUser.login);

        if (!loggedInUser) {
            return reject('User does not exist. Try to type another credentials.');
        }

        return resolve(loggedInUser);
    });
}

export default {
    auth,
    unAuth,
    checkAuth
};
