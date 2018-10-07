import { FETCH_APPOINTMENTS, NEW_APPOINTMENT } from '../actions/types';

const initialState = {
    appointments: [],
    response: {}
}

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_APPOINTMENTS:
            return {
                ...state,
                appointments: action.payload
            }
        case NEW_APPOINTMENT:
            return {
                ...state,
                response: action.payload
            }
        default:
            return state;
    }
}