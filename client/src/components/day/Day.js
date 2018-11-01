import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Icon } from 'antd';
import { fetchAppointments } from '../../actions/appointmentActions';
import "./Day.css";

class Day extends Component {
    constructor(props) {
        super(props);

        this.getMinutes = this.getMinutes.bind(this);
        this.getHours = this.getHours.bind(this);
        this.getAppointmentsList = this.getAppointmentsList.bind(this);
        this.sortAppointments = this.sortAppointments.bind(this);

        this.state = {
            hours: new Array(24)
        }
    }

    componentWillMount() {
        this.getHours();
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
                    notes: "",
                    attendees: []
                },
                token: this.props.credentials.token
            };
            this.props.fetchAppointments(req);
        }
    }

    getMinutes() {
        let dataSourceSub = new Array;
        let i = 0;
        for (i = 0; i < 60; i += 5) {
            dataSourceSub.push(<div key={i} className="minutes"></div>);
        }
        return dataSourceSub;
    }

    getHours() {
        for (let i = 0; i < 24; i++) {
            if (i == 0) {
                this.state.hours[i] = '12:00AM';
            }
            else if (i < 10) {
                this.state.hours[i] = '0' + (i) + ':00AM';
            }
            else if (i == 12) {
                this.state.hours[i] = (i) + ':00PM';
            }
            else if (i == 10 || i == 11) {
                this.state.hours[i] = (i) + ':00AM';
            }
            else if (i > 12 && i < 22) {
                this.state.hours[i] = '0' + (i - 12) + ':00PM';
            }
            else if (i == 22 || i == 23) {
                this.state.hours[i] = (i - 12) + ':00PM';
            }
        }
    }

    sortAppointments(appointments) {
        appointments.sort((a, b) => {
            if (a.startTimeInMinutes < b.startTimeInMinutes) {
                return -1;
            }
            if (a.startTimeInMinutes > b.startTimeInMinutes) {
                return 1;
            }
            return 0;
        })
        return appointments;
    }

    getAppointmentsList() {
        let list = [];
        let appointments = [];
        let j = 0;
        this.props.appointments.forEach(appointment => {
            if (appointment.startDate == this.props.match.params.day) {
                appointments.push(appointment);
            }
        });
        appointments = this.sortAppointments(appointments);
        for (let i = 0; i < 24; i++) {
            let hour = {
                key: i + 1,
                width: 100,
                militaryHour: "",
                time: "",
                appointment: this.getMinutes()
            }
            hour.time = this.state.hours[i];
            if (i < 9) {
                hour.militaryTime = '0' + (i) + ':00';
            }
            else {
                hour.militaryTime = (i) + ':00';
            }
            appointments.forEach(appointment => {
                if (appointment.startTime.substring(0, 2) == hour.militaryTime.substring(0, 2)) {
                    let minutes = appointment.startTime.substring(3, 5);
                    let index = null;
                    if (minutes == '00') {
                        index = 0;
                    }
                    if (minutes == '05') {
                        index = 1;
                    }
                    if (minutes == '10') {
                        index = 2;
                    }
                    if (minutes == '15') {
                        index = 3;
                    }
                    if (minutes == '20') {
                        index = 4;
                    }
                    if (minutes == '25') {
                        index = 5;
                    }
                    if (minutes == '30') {
                        index = 6;
                    }
                    if (minutes == '35') {
                        index = 7;
                    }
                    if (minutes == '40') {
                        index = 8;
                    }
                    if (minutes == '45') {
                        index = 9;
                    }
                    if (minutes == '50') {
                        index = 10;
                    }
                    if (minutes == '55') {
                        index = 11;
                    }
                    for (let k = 0; k <= j - 1; k++) {
                        if (appointment.startTimeInMinutes < (appointments[k].startTimeInMinutes + appointments[k].timespan)
                            && appointment.column === appointments[k].column) {
                            appointment.column++;
                        }
                    }
                    hour.appointment[index] = <div key={index} className="minutes">
                        <Link to={`/dashboard/appointment/${appointment._id}`}>
                            <span
                                className="appointment"
                                style={{ height: appointment.timespan * 2, marginLeft: appointment.column * 100 }}
                            >
                                {appointment.title}<br />
                                {appointment.displayStart}
                            </span>
                        </Link>
                    </div>
                    j++;
                }
            })
            list.push(hour);
        }
        return list;
    }

    render() {
        const columns = [{
            title: 'Time',
            dataIndex: 'time',
            key: 'time'
        }, {
            title: 'Appointment',
            dataIndex: 'appointment',
            key: 'appointment',
        }]

        let dataSource = this.getAppointmentsList();

        return (
            <div>
                <div className="table-container">
                    <Table columns={columns} dataSource={dataSource} rowClassName="custom-row" pagination={false} scroll={{ y: 540, x: 800 }} />
                </div>
                <div>
                    <Link className="back" to="/dashboard/calendar"><Icon type="left" />Back to Calendar</Link>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    appointments: state.appointments.appointments,
    response: state.appointments.response,
    credentials: state.users.credentials
});

export default connect(mapStateToProps, { fetchAppointments })(Day);