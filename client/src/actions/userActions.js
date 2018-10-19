import { NEW_USER, LOGIN_USER } from './types';

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

export const loginUser = (user) => dispatch => {
    console.log(JSON.stringify(user))
    fetch('http://localhost:8080/login', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(res => dispatch({
            type: LOGIN_USER,
            payload: res.token
        }))
}