import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchAppointments } from '../../actions/appointmentActions';
import { Card, Button, Divider } from 'antd';
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
        let timespan = new Date();
        timespan.setDate(timespan.getDate() + 3);
        console.log(timespan.getTime());
        this.props.appointments.forEach(appointment => {
            let apptDate = new Date(appointment.startDate);
            console.log(apptDate.getTime());
            if (apptDate.getTime() < timespan.getTime()) {
                console.log("less");
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
        console.log(this.state.upcomingList);
        return (
            <div className="upcoming-card">
                <Card
                    title="Upcoming"
                >
                    {content}
                    <Button>View All</Button>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    appointments: state.appointments.appointments,
    response: state.appointments.response
});

export default connect(mapStateToProps, { fetchAppointments })(UpcomingAppointments);