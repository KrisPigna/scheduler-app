import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppointmentForm from './appointment-form/AppointmentForm';
import AppointmentCalendar from './calendar/AppointmentCalendar';
import UpcomingAppointments from './upcoming-appointments/UpcomingAppointments'
import Day from './day/Day';
import './App.css';
import { Provider } from 'react-redux';
import store from '../store'

import { Layout, Menu, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
    render() {
        return (
            <Router>
                <Provider store={store}>
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
                                    <Route exact path="/" component={AppointmentCalendar} />
                                    <Route path="/day/:day" component={Day}/>
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </Provider>
            </Router>
        );
    }
}

export default App;