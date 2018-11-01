import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { deleteAppointment } from '../../actions/appointmentActions'
import { Card, Modal, Icon } from 'antd';
import './Appointment.css';

class Appointment extends Component {
    constructor(props) {
        super(props);

        this.deleteAppointment = this.deleteAppointment.bind(this);
        this.editAppointment = this.editAppointment.bind(this);

        this.state = {
            selectedApt: {},
            redirect: false
        }
    }

    componentWillMount() {
        try {
            this.props.appointments.forEach(appointment => {
                if (appointment._id == this.props.match.params.id) {
                    this.setState({ selectedApt: appointment });
                }
            });
        }
        catch(e) {
            
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.appointments.length < prevProps.appointments.length) {
            Modal.success({
                content: "Appointment deleted"
            });
            this.setState({ redirect: true })
        }
    }

    editAppointment() {
    }

    deleteAppointment() {
        let req = {
            appointment: this.state.selectedApt,
            token: this.props.credentials.token
        };
        Modal.confirm({
            title: 'Confirm',
            content: 'This will permanently delete the appointment. Continue?',
            okText: 'Yes',
            cancelText: 'Cancel',
            onOk: () => { this.props.deleteAppointment(req); }
        })
    }

    render() {
        if (this.state.redirect === true) {
            return (<Redirect to="/dashboard/calendar" />)
        }
        return (
            <div className="appointment-card">
                <Card
                    title={this.state.selectedApt.title}
                    actions={[
                        //<div onClick={this.editAppointment}>Edit</div0>,
                        <div onClick={this.deleteAppointment}>Delete</div>
                    ]}
                >
                    <div className="contents">
                        <p><span className="label">Date: </span>{this.state.selectedApt.startDate}</p>
                        <p><span className="label">Time: </span>{this.state.selectedApt.displayStart} - {this.state.selectedApt.displayEnd}</p>
                        <p><span className="label">Length: </span>{this.state.selectedApt.timespan} mins</p>
                        <p><span className="label">Attendees: </span>{this.state.selectedApt.attendees}</p>
                        <p><span className="label">Notes: </span>{this.state.selectedApt.notes}</p>
                    </div>
                </Card>
                <div>
                    <Link className="back" to={`/dashboard/day/${this.state.selectedApt.startDate}`}><Icon type="left" />Back to {this.state.selectedApt.startDate}</Link>
                </div>
                <div>
                    <Link className="back" to="/dashboard/calendar"><Icon type="left" />Back to Calendar</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    appointments: state.appointments.appointments,
    response: state.appointments.response,
    credentials: state.users.credentials
});

export default connect(mapStateToProps, { deleteAppointment })(Appointment);
