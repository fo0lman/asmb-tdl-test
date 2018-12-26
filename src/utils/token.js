import jwt from 'jwt-simple';

export const getToken = (data, secret) => jwt.encode(data, secret);
export const decodeToken = (token, secret) => jwt.decode(token, secret);
