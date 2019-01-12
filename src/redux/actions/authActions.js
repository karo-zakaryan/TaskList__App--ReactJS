import actionTypes from "./actionTypes";
import {config} from '../../configs/config';

export const signIn = data => dispatch => {
    return new Promise(
        (resolve, reject) => {
            if (data.username === config.auth.username && data.password === config.auth.password) {
                dispatch({
                    type: actionTypes.SIGN_IN,
                    payload: {
                        username: data.username
                    }
                });
                resolve();
            } else {
                reject('Username or password is incorrect!');
            }
        });
};

export const signOut = () => dispatch => {
    dispatch({
        type: actionTypes.SIGN_OUT
    });
};