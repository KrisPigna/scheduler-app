import { FETCH_APPOINTMENTS, NEW_APPOINTMENT } from './types';

export const fetchAppointments = () => dispatch => {
    fetch('http://localhost:8080/api/get_appointments')
    .then(res => res.json())
    .then(appointments => dispatch({
        type: FETCH_APPOINTMENTS,
        payload: appointments
    }))
}