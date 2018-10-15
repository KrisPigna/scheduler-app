import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAppointments } from '../../actions/appointmentActions';
import { Calendar, Drawer, Button, Icon, Popover, Badge } from 'antd';
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

        let day = new Date();
        let dd = day.getDate();
        let mm = day.getMonth() + 1;
        let yyyy = day.getFullYear();

        let today = yyyy + '-' + mm + '-0' + dd;

        this.state = {
            fullscreen: true,
            value: moment(today),
            showModal: false
        }
    }

    componentDidMount() {
        this.toggleFullscreen();
        window.addEventListener('resize', this.toggleFullscreen);
        this.props.fetchAppointments();
    }

    componentDidUpdate(prevProps) {
        if (this.props.response !== prevProps.response) {
            this.props.fetchAppointments();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.toggleFullscreen);
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

    onOpen(e) {
        this.setState({ showModal: true});
    }

    onClose() {
        this.setState({ showModal: false });
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
        if (value != undefined && this.props.appointments[0] != undefined) {
            day = value.format("YYYY-MM-DD");
            this.props.appointments.forEach(appointment => {
                if (appointment.startDate === day) {
                    appointments.push(appointment);
                    details.push(<li key={appointment._id}>{appointment.title}</li>);
                    match = true;
                }
            });
            appointments.forEach(appointment => {
                content.push(<div key={appointment._id}><Link to={`/appointment/${appointment._id}`}>{appointment.title}: {appointment.startTime}-{appointment.endTime}</Link></div>)
             })
        }
        if (this.state.fullscreen == true) {
            if (match === true) {
                const title = <Link to={`/day/${day}`}>{day}</Link>;
                return (
                    <div className="date">
                        <Popover placement="top" title={title} content={content} trigger="click">
                            <ul className="appointments">
                                {details}
                            </ul>
                        </Popover>
                    </div>
                );
            }

        }
        else {
            if (match === true) {
                const title = <Link to={`/day/${day}`}>{day}</Link>;
                return (
                    <div>
                        <Badge count={1} onClick={this.onOpen}/>
                        <Drawer
                            title={title}
                            placement="bottom"
                            closable={false}
                            onClose={this.onClose}
                            visible={this.state.showModal}
                        >
                            {content}
                        </Drawer>
                    </div>
                );
            }
        }

    }


    render() {
        const ButtonGroup = Button.Group;

        return (
            <div className="calendar-container">
                <ButtonGroup>
                    <Button onClick={this.prevMonth}>
                        <Icon type="left" />
                    </Button>
                    <Button onClick={this.nextMonth}>
                        <Icon type="right" />
                    </Button>
                </ButtonGroup>
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
    response: state.appointments.response
});

export default connect(mapStateToProps, { fetchAppointments })(AppointmentCalendar);