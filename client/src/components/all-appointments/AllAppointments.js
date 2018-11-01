import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAppointments } from '../../actions/appointmentActions'
import { Table, Icon } from 'antd';
import "./AllAppointments.css";

class AllAppointments extends Component {
    constructor(props) {
        super(props);

        this.buildAppointmentsList = this.buildAppointmentsList.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.response !== prevProps.response) {
            let req = {
                appointment: {
                    title: "",
                    startDate: "",
                    startTime: "",
                    endDate: "",
                    endTime: "",
                    displayStart: "",
                    displayEnd: "",
                    notes: "",
                    attendees: []
                },
                token: this.props.credentials.token
            };
            this.props.fetchAppointments(req);
        }
    }

    buildAppointmentsList() {
        let list = [];
        try {
            this.props.appointments.forEach(appointment => {
                if (list.find(x => x.day == appointment.startDate)) {
                    list.find(x => x.day == appointment.startDate).appointments.push(
                        <div key={appointment._id}>
                           <Link to={`/dashboard/appointment/${appointment._id}`}>{appointment.title}</Link><br />
                            {appointment.displayStart}-{appointment.displayEnd}<br />
                            {appointment.attendees}<br />
                            {appointment.notes}
                        </div>
                    )
                }
                else {
                    let dayEntry = { key: appointment.startDate, day: appointment.startDate, appointments: [] };
                    dayEntry.appointments.push(
                        <div key={appointment._id}>
                            <Link to={`/dashboard/appointment/${appointment._id}`}>{appointment.title}</Link><br />
                            {appointment.displayStart}-{appointment.displayEnd}<br />
                            {appointment.attendees}<br />
                            {appointment.notes}
                        </div>
                    );
                    list.push(dayEntry);
                }
            });
            return list;
        }
        catch (e) {
            return null;
        }
    }

    render() {
        const columns = [{
            title: 'Day',
            dataIndex: 'day',
            width: 130,
            key: 'day'
        }, {
            title: 'Appointments',
            dataIndex: 'appointments',
            key: 'appointments',
        }]

        let dataSource = this.buildAppointmentsList();

        return (
            <div>
                <div className="appointments-table">
                    <Table columns={columns} dataSource={dataSource} pagination={false} scroll={{ y: 540, x: "auto" }} />
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

export default connect(mapStateToProps, { fetchAppointments })(AllAppointments);
