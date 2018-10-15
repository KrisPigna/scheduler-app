import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteAppointment } from '../../actions/appointmentActions'
import { Card, Modal } from 'antd';
import './Appointment.css';

class Appointment extends Component {
    constructor(props) {
        super(props);

        this.deleteAppointment = this.deleteAppointment.bind(this);
        this.editAppointment = this.editAppointment.bind(this);

        this.state = {
            selectedApt: {}
        }
    }

    componentWillMount() {
        this.props.appointments.forEach(appointment => {
            if (appointment._id == this.props.match.params.id) {
                this.setState({selectedApt: appointment});
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.appointments.length < prevProps.appointments.length) {
            Modal.success({
                content: "Appointment deleted"
            });
        }
    }

    editAppointment() {
        console.log(this.state.selectedApt._id);
    }

    deleteAppointment() {
        Modal.confirm({
            title: 'Confirm',
            content: 'This will permanently delete the appointment. Continue?',
            okText: 'Yes',
            cancelText: 'Cancel',
            onOk: () => {this.props.deleteAppointment(this.state.selectedApt._id);}
        })
    }

    render() {
        return (
            <div className="appointment-card">
                <Card
                    title={this.state.selectedApt.title}
                    actions={[
                        <div onClick={this.editAppointment}>Edit</div>,
                        <div onClick={this.deleteAppointment}>Delete</div>
                    ]}
                >
                    <p>{this.state.selectedApt.startDate}</p>
                    <p>{this.state.selectedApt.startTime} - {this.state.selectedApt.endTime}</p>
                    <p>{this.state.selectedApt.attendees}</p>
                    <p>{this.state.selectedApt.notes}</p>
                    <p>{this.state.selectedApt.timespan}</p>
                </Card>
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    appointments: state.appointments.appointments,
    response: state.appointments.response
});

export default connect(mapStateToProps, {deleteAppointment})(Appointment);
