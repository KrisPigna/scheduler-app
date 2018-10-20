import { NEW_USER, LOGIN_USER } from '../actions/types';

const initialState = {
    token: null,
    username: null,
    created: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case NEW_USER:
            return {
                ...state,
                created: action.payload
            }
        case LOGIN_USER:
            return {
                ...state,
                token: action.payload.token,
                username: action.payload.username
            }
        default:
            return state;
    }
}