import { NEW_USER, LOGIN_USER } from '../actions/types';

const initialState = {
    toekn: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case NEW_USER:
            return {
                ...state,
                validated: action.payload
            }
        case LOGIN_USER:
            return {
                ...state,
                token: action.payload
            }
        default:
            return state;
    }
}