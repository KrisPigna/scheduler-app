import { combineReducers } from 'redux';
import appointmentReducer from './appointmentReducer';
import userReducer from './userReducer';

export default combineReducers({
    appointments: appointmentReducer,
    users: userReducer
});