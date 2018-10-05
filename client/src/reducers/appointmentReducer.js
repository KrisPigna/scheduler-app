import { FETCH_APPOINTMENTS, NEW_APPOINTMENT } from '../actions/types';

const initialState = {
    appointments: [],
    appointment: {}
}

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_APPOINTMENTS:
            return {
                ...state,
                appointments: action.payload
            }
        default:
            return state;
    }
}