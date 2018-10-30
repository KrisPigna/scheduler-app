import { NEW_USER, LOGIN_USER, LOGOUT_USER } from './types';

export const createUser = (user) => dispatch => {
    fetch('http://localhost:8080/api/sign_up', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(res => dispatch({
            type: NEW_USER,
            payload: res
        }))
}

export const clearUser = () => dispatch => {
    dispatch({
        type: NEW_USER,
        payload: {}
    });
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT_USER,
        payload: {}
    });
}

export const loginUser = (user) => dispatch => {
        console.log(JSON.stringify(user))
    fetch('http://localhost:8080/api/sign_in', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            dispatch({
            type: LOGIN_USER,
            payload: res
        })
    })
}

export const authenticateToken = (token) => dispatch => {
    
}