import { NEW_USER, LOGIN_USER, LOGOUT_USER } from '../actions/types';

const initialState = {
    credentials: null,
    username: null,
    newUser: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case NEW_USER:
            return {
                ...state,
                newUser: action.payload
            }
        case LOGIN_USER:
            return {
                ...state,
                credentials: action.payload,
                username: action.payload.username
            }
        case LOGOUT_USER:
            return {
                ...state,
                credentials: null,
                username: null
            }
        default:
            return state;
    }
}