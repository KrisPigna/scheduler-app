import React, { Component } from 'react';
import AppointmentForm from './appointment-form/AppointmentForm';
import AppointmentCalendar from './calendar/AppointmentCalendar';
import './App.css';
import { Provider } from 'react-redux';
import store from '../store'

import { Layout, Menu, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Layout className="container">
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={(broken) => { console.log(broken); }}
                        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                    >
                        <div className="logo" />
                        <AppointmentForm />

                    </Sider>
                    <Layout>
                        <Content className="content">
                            <div className="calendar">
                                <AppointmentCalendar />
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Provider>
        );
    }
}

export default App;