import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppointmentForm from '../appointment-form/AppointmentForm';
import AppointmentCalendar from '../calendar/AppointmentCalendar';
import UpcomingAppointments from '../upcoming-appointments/UpcomingAppointments'
import Day from '../day/Day';
import Appointment from '../appointment/Appointment';
import User from './User'
import AllAppointments from '../all-appointments/AllAppointments';

import { Layout } from 'antd';

const { Content, Sider } = Layout;

class Dashboard extends Component {

    render() {
        if (this.props.credentials === null) {
            return (
                <Redirect to="/" />
            )
        }
        else {
            return (
                <Layout className="container">
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                    >
                        <User />
                        <AppointmentForm />
                        <UpcomingAppointments />
                    </Sider>
                    <Layout>
                        <Content className="content">
                            <Route exact path="/dashboard/calendar" component={AppointmentCalendar} />
                            <Route exact path="/dashboard/day/:day" component={Day} />
                            <Route exact path="/dashboard/appointment/:id" component={Appointment} />
                            <Route exact path="/dashboard/all_appointments" component={AllAppointments} />
                        </Content>
                    </Layout>
                </Layout>
            )
        }
    }
}

const mapStateToProps = state => ({
    credentials: state.users.credentials
});

export default connect(mapStateToProps, {})(Dashboard);
