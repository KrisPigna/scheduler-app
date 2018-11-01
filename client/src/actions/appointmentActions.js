import { FETCH_APPOINTMENTS, NEW_APPOINTMENT, DELETE_APPOINTMENT } from './types';

export const fetchAppointments = (req) => dispatch => {
    fetch('http://localhost:8080/api/get_appointments', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.token
        },
        method: 'post',
        body: JSON.stringify(req)
    })
        .then(res => res.json())
        .then(appointments => {
            appointments.sort((a, b) => {
                let dateA = new Date(a.startDate+"T"+a.startTime);
                let dateB = new Date(b.startDate+"T"+b.startTime);
                if (dateA.getTime() < dateB.getTime()) {
                    return -1;
                }
                else if (dateA.getTime() > dateB.getTime()) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            dispatch({
            type: FETCH_APPOINTMENTS,
            payload: appointments
        })
    })
}

export const createAppointment = (req) => dispatch => {
    fetch('http://localhost:8080/api/new_appointment', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.token
        },
        method: 'post',
        body: JSON.stringify(req)
    })
        .then(res => res.json())
        .then(res => dispatch({
            type: NEW_APPOINTMENT,
            payload: res
        }))
}

export const deleteAppointment = (req) => dispatch => {
    fetch('http://localhost:8080/api/delete_appointment', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.token
        },
        method: 'post',
        body: JSON.stringify(req)
    })
        .then(res => res.json())
        .then(appointments => {
            appointments.sort((a, b) => {
                let dateA = new Date(a.startDate+"T"+a.startTime);
                let dateB = new Date(b.startDate+"T"+b.startTime);
                if (dateA.getTime() < dateB.getTime()) {
                    return -1;
                }
                else if (dateA.getTime() > dateB.getTime()) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            dispatch({
            type: FETCH_APPOINTMENTS,
            payload: appointments
        })
    })
}