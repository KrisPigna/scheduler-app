import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Icon } from 'antd';

class AllAppointments extends Component {
    constructor(props) {
        super(props);

        this.buildAppointmentsList = this.buildAppointmentsList.bind(this);
    }

    buildAppointmentsList() {
        let list = [];
        this.props.appointments.forEach(appointment => {
            if (list.find(x => x.day == appointment.startDate)) {
                list.find(x => x.day == appointment.startDate).appointments.push(
                    <div key={appointment._id}>
                       <Link to={`/dashboard/appointment/${appointment._id}`}>{appointment.title}</Link><br />
                        {appointment.startTime}<br />
                        {appointment.endTime}<br />
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
                        {appointment.startTime}<br />
                        {appointment.endTime}<br />
                        {appointment.attendees}<br />
                        {appointment.notes}
                    </div>
                );
                list.push(dayEntry);
            }
        });
        return list;
    }

    render() {
        const columns = [{
            title: 'Day',
            dataIndex: 'day',
            key: 'day'
        }, {
            title: 'Appointments',
            dataIndex: 'appointments',
            key: 'appointments',
        }]

        let dataSource = this.buildAppointmentsList();

        console.log(dataSource);

        return (
            <div>
                <div className="table-container">
                    <Table columns={columns} dataSource={dataSource} pagination={false} scroll={{ y: 540 }} />
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
    response: state.appointments.response
});

export default connect(mapStateToProps, { })(AllAppointments);
