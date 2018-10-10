import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Card } from 'antd';
import './Appointment.css';

class Appointment extends Component {
    render() {
        let selectedApt = null;
        this.props.appointments.forEach(appointment => {
            if (appointment._id == this.props.match.params.id) {
                selectedApt = appointment;
            }
        });
        return (
            <div className="appointment-card">
                <Card
                    title={selectedApt.title}
                    actions={["Edit", "Delete"]}
                >
                    <p>{selectedApt.startDate}</p>
                    <p>{selectedApt.startTime} - {selectedApt.endTime}</p>
                    <p>{selectedApt.attendees}</p>
                    <p>{selectedApt.notes}</p>
                </Card>
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    appointments: state.appointments.appointments,
    response: state.appointments.response
});

export default connect(mapStateToProps, {})(Appointment);
