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

    componentWillMount() {
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
            let apptDate = new Date(appointment.startDate+"T"+appointment.startTime);
            console.log("Timespan " + timespan)
            console.log("App Time " + apptDate);
            console.log("Today " + today)
            if (apptDate.getTime() < timespan.getTime() && apptDate.getTime() >= today.getTime()) {
                console.log("added")
                this.state.upcomingList.push(appointment);
            }
        });
        this.state.upcomingList.sort((a, b) => {
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
        console.log(this.state.upcomingList)
    }

    displayUpcomingAppointments() {
        if (this.state.upcomingList.length > 0) {
            return this.state.upcomingList.map(appointment => {
                return <div key={appointment._id}>
                            <Link to={`/dashboard/appointment/${appointment._id}`}>{appointment.title}:</Link><br/>
                            {appointment.startDate}<br/>
                            {appointment.displayStart}
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