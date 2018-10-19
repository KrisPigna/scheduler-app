import React, { Component } from 'react'
import { Route } from 'react-router-dom';

import AppointmentForm from '../appointment-form/AppointmentForm';
import AppointmentCalendar from '../calendar/AppointmentCalendar';
import UpcomingAppointments from '../upcoming-appointments/UpcomingAppointments'
import Day from '../day/Day';
import Appointment from '../appointment/Appointment';

import { Layout } from 'antd';

const { Content, Sider } = Layout;

class Dashboard extends Component {
    render() {
        return (
            <Layout className="container">
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => { console.log(broken); }}
                    onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                >
                    <AppointmentForm />
                    <UpcomingAppointments />
                </Sider>
                <Layout>
                    <Content className="content">
                        <div className="calendar">
                            <Route path="/dashboard/calendar" component={AppointmentCalendar} />
                            <Route path="/dashboard/day/:day" component={Day} />
                            <Route path="/dashboard/appointment/:id" component={Appointment} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Dashboard;
