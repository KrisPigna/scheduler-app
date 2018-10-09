import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Icon } from 'antd';
import "./Day.css";

class Day extends Component {
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

        let dataSource = [];
        for (var i = 0; i < 24; i++) {
            let hour = {
                key: i+1,
                time: "",
                appointment: []
            }
            if (i < 9) {
                hour.time = '0' + (i+1) + ':00';
            }
            else {
                hour.time = (i+1) + ':00'; 
            }
            
            this.props.appointments.forEach(appointment => {
                console.log(appointment.startTime.substring(0,5));
            console.log(hour.time);
                if (appointment.startDate == this.props.match.params.day
                    && appointment.startTime.substring(0, 5) == hour.time) {
                    hour.appointment.push(appointment.title);
                }
            })
            dataSource.push(hour);
        }

        return (
            <div>
                <Table columns={columns} dataSource={dataSource} />
                <Link className="back" to="/"><Icon type="left" />Back to Calendar</Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    appointments: state.appointments.appointments,
    response: state.appointments.response
});

export default connect(mapStateToProps, {})(Day);
