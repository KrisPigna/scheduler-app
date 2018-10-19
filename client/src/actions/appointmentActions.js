import { FETCH_APPOINTMENTS, NEW_APPOINTMENT, DELETE_APPOINTMENT } from './types';

export const fetchAppointments = () => dispatch => {
    fetch('http://localhost:8080/api/get_appointments', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        method: 'get'
    })
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

export const deleteAppointment = (id) => dispatch => {
    let url = 'http://localhost:8080/api/delete_appointment/' + id;
    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'delete',
    })
        .then(res => res.json())
        .then(appointments => dispatch({
            type: DELETE_APPOINTMENT,
            payload: appointments
        }))
}