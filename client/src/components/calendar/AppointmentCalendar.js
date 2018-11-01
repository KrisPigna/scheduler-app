import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAppointments } from '../../actions/appointmentActions';
import { Calendar, Drawer, Tag, Popover, Badge } from 'antd';
import moment from 'moment';
import './AppointmentCalendar.css'

class AppointmentCalendar extends Component {
    constructor(props) {
        super(props);

        this.onPanelChange = this.onPanelChange.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
        this.dateCellRender = this.dateCellRender.bind(this);
        this.buildDrawerList = this.buildDrawerList.bind(this);

        let day = new Date();
        let dd = day.getDate();
        let mm = day.getMonth() + 1;
        let yyyy = day.getFullYear();

        let today = yyyy + '-' + mm + '-0' + dd;

        this.state = {
            fullscreen: true,
            value: moment(today),
            showDrawer: []
        }
    }

    componentDidMount() {
        this.toggleFullscreen();
        window.addEventListener('resize', this.toggleFullscreen);
        let req = {
            appointment: {
                title: "",
                startDate: "",
                startTime: "",
                endDate: "",
                endTime: "",
                displayStart: "",
                displayEnd: "",
                notes: "",
                attendees: []
            },
            token: this.props.credentials.token
        };
        this.props.fetchAppointments(req);
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
                    displayStart: "",
                    displayEnd: "",
                    notes: "",
                    attendees: []
                },
                token: this.props.credentials.token
            };
            this.props.fetchAppointments(req);
        }
        this.buildDrawerList();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.toggleFullscreen);
    }

    buildDrawerList() {
        try {
            while (this.state.showDrawer.length > 0) {
                this.state.showDrawer.pop();
            }
            this.props.appointments.forEach(appointment => {
                let duplicate = this.state.showDrawer.findIndex(x => x.day === appointment.startDate);
                if (duplicate === -1) {
                    this.state.showDrawer.push({ day: appointment.startDate, value: false })
                }
            })
        }
        catch (err) {
        }
    }

    toggleFullscreen() {
        if (window.innerWidth < 700) {
            this.setState({ fullscreen: false });
        } else {
            this.setState({ fullscreen: true });
        }
        this.dateCellRender();
    }

    onPanelChange(value, mode) {
        this.setState({ value: value })
    }

    onOpen(day) {
        this.state.showDrawer.find(x => x.day === day).value = true;
    }

    onClose() {
        this.state.showDrawer.forEach(item => {
            item.value = false;
        })
    }

    nextMonth() {
        let newMonth = (parseInt(this.state.value.format('MM')) + 1);
        if (newMonth > 12) {
            newMonth = 1;
        }
        let newValue = this.state.value.format('YYYY') + '-' + newMonth + '-01';
        this.setState({ value: moment(newValue) })
    }

    prevMonth() {
        let newMonth = (parseInt(this.state.value.format('MM')) - 1);
        if (newMonth < 1) {
            newMonth = 12;
        }
        let newValue = this.state.value.format('YYYY') + '-' + newMonth + '-01';
        this.setState({ value: moment(newValue) })
    }

    dateCellRender(value) {
        let day = null;
        let match = false;
        let appointments = [];
        let details = [];
        let content = [];
        let i = 0;
        if (value != undefined && this.props.appointments[0] != undefined) {
            day = value.format("YYYY-MM-DD");
            this.props.appointments.forEach(appointment => {
                if (appointment.startDate === day) {
                    appointments.push(appointment);
                    details.push(<div><Tag className="tag" color="geekblue" key={appointment._id}>{appointment.title}</Tag></div>);
                    match = true;
                }
            });
            appointments.forEach(appointment => {
                content.push(<div key={appointment._id}><Link to={`/dashboard/appointment/${appointment._id}`}>{appointment.title}: {appointment.displayStart}-{appointment.displayEnd}</Link></div>)
            })
        }
        if (this.state.fullscreen == true) {
            if (match === true) {
                const title = <Link to={`/dashboard/day/${day}`}>{day}</Link>;
                return (
                    <div className="date">
                        <Popover placement="top" title={title} content={content} trigger="click">
                            <div className="appointments">
                                {details}
                            </div>
                        </Popover>
                    </div>
                );
            }

        }
        else {
            if (match === true) {
                const title = <Link to={`/dashboard/day/${day}`}>{day}</Link>;
                return (
                    <div>
                        <Badge count={appointments.length} onClick={() => this.onOpen(day)} />
                        <Drawer
                            title={title}
                            placement="bottom"
                            closable={true}
                            onClose={this.onClose}
                            visible={this.state.showDrawer.find(x => x.day === day).value}
                        >
                            {content}
                        </Drawer>
                    </div>
                );
            }
        }

    }


    render() {
        this.buildDrawerList();

        return (
            <div className="calendar">
                <Calendar
                    dateCellRender={this.dateCellRender}
                    fullscreen={this.state.fullscreen}
                    onPanelChange={this.onPanelChange}
                />
            </div >
        )
    }
}

const mapStateToProps = state => ({
    appointments: state.appointments.appointments,
    response: state.appointments.response,
    credentials: state.users.credentials
});

export default connect(mapStateToProps, { fetchAppointments })(AppointmentCalendar);