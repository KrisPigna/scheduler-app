import { FETCH_APPOINTMENTS, NEW_APPOINTMENT } from './types';

export const fetchAppointments = () => dispatch => {
    fetch('http://localhost:8080/api/get_appointments')
        .then(res => res.json())
        .then(appointments => dispatch({
            type: FETCH_APPOINTMENTS,
            payload: appointments
        }))
}

export const createAppointment = (appointment) => dispatch => {
    fetch('http://localhost:8080/api/new_appointment', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(appointment)
    })
        .then(res => res.json())
        .then(res => dispatch({
            type: NEW_APPOINTMENT,
            payload: res
        }))
}