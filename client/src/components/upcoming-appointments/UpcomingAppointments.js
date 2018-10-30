import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Divider } from 'antd';
import './UpcomingAppointments.css'

class UpcomingAppointments extends Component {
    constructor(props) {
        super(props);

        this.generateUpcomingList = this.generateUpcomingList.bind(this);
        this.displayUpcomingAppointments = this.displayUpcomingAppointments.bind(this);

        this.state = {
            upcomingList: []
        }
    }

    componentDidMount() {
        this.generateUpcomingList();
    }

    componentDidUpdate() {

    }

    generateUpcomingList() {
        while (this.state.upcomingList.length > 0) {
            this.state.upcomingList.pop();
        }
        let today = new Date();
        let timespan = new Date();
        timespan.setDate(timespan.getDate() + 3);
        this.props.appointments.forEach(appointment => {
            let apptDate = new Date(appointment.startDate);
            if (apptDate.getTime() < timespan.getTime() && apptDate.getTime() >= today.getTime()) {
                this.state.upcomingList.push(appointment);
            }
        });
    }

    displayUpcomingAppointments() {
        if (this.state.upcomingList.length > 0) {
            return this.state.upcomingList.map(appointment => {
                return <div key={appointment._id}>
                            {appointment.title}:<br/>
                            {appointment.startDate}<br/>
                            {appointment.startTime}
                            <Divider />
                        </div>
            })
        }
        else {
            return <div>No upcoming appointments</div>;
        }
    }
    render() {
        this.generateUpcomingList();
        const content = this.displayUpcomingAppointments();
        return (
            <div className="upcoming-card">
                <Card
                    title="Upcoming"
                    extra={<Link to="/dashboard/all_appointments">View All</Link>}
                >
                    {content}
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    appointments: state.appointments.appointments,
    response: state.appointments.response
});

export default connect(mapStateToProps, { })(UpcomingAppointments);