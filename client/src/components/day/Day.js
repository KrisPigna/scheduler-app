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
    }

    componentDidUpdate(prevProps) {
        if (this.props.response !== prevProps.response) {
            this.props.fetchAppointments();
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

    render() {
        const columns = [{
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            width: 70
        }, {
            title: 'Appointment',
            dataIndex: 'appointment',
            key: 'appointment',
        }]

        let dataSource = [];
        for (let i = 0; i < 24; i++) {
            let hour = {
                key: i + 1,
                time: "",
                appointment: this.getMinutes()
            }
            if (i < 9) {
                hour.time = '0' + (i + 1) + ':00';
            }
            else {
                hour.time = (i + 1) + ':00';
            }
            this.props.appointments.forEach(appointment => {
                console.log("appointment: " + appointment.startTime.substring(0, 2));
                console.log("Hour: " + hour.time.substring(0,2));
                if (appointment.startDate == this.props.match.params.day
                    && appointment.startTime.substring(0, 2) == hour.time.substring(0, 2)) {
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
                    hour.appointment[index] = <div key={index} className="minutes"><Link to={`/appointment/${appointment._id}`}>{appointment.title}</Link></div>
                }
            })
            dataSource.push(hour);
        }

        return (
            <div>
                <div className="table-container">
                    <Table columns={columns} dataSource={dataSource} pagination={false} scroll={{ y: 540 }} />
                </div>
                <div>
                    <Link className="back" to="/"><Icon type="left" />Back to Calendar</Link>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    appointments: state.appointments.appointments,
    response: state.appointments.response
});

export default connect(mapStateToProps, {fetchAppointments})(Day);
