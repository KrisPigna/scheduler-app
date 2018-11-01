import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createAppointment } from '../../actions/appointmentActions';
import { Drawer, DatePicker, TimePicker, Button, Form, Input, Modal } from 'antd';
import moment from 'moment';
import './AppointmentForm.css'

const FormItem = Form.Item;

class AppointmentForm extends Component {
    constructor(props) {
        super(props);

        this.setStartDate = this.setStartDate.bind(this);
        this.setStartTime = this.setStartTime.bind(this);
        this.setEndDate = this.setEndDate.bind(this);
        this.setEndTime = this.setEndTime.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.disabledDates = this.disabledDates.bind(this);
        this.disabledHours = this.disabledHours.bind(this);
        this.disabledMinutes = this.disabledMinutes.bind(this);

        let day = new Date();
        let dd = day.getDate();
        if (dd < 10) {
            dd = "0" + dd;
        }
        let mm = day.getMonth() + 1;
        let yyyy = day.getFullYear();
        let today = yyyy + '-' + mm + '-' + dd;

        day.setDate(day.getDate() - 1);
        dd = day.getDate();
        mm = day.getMonth() + 1;
        yyyy = day.getFullYear();
        let yesterday = yyyy + '-' + mm + '-0' + dd;

        this.state = {
            yesterday: yesterday,
            title: "",
            startDate: today,
            startTime: "12:00am",
            endDate: today,
            endTime: "12:00am",
            notes: "",
            attendees: "",
            showDrawer: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.response._id) {
            if (this.props.response._id != prevProps.response._id) {
                Modal.success({
                    content: "Appointment created"
                });
            }
        }
    }

    disabledDates(endValue) {
        const startValue = moment(this.state.yesterday);
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    disabledHours() {
        let arr = [];
        let end = moment(this.state.startTime, 'h:mm a').hour();
        for (let i = 0; i < end; i++) {
            arr.push(i);
        }
        return arr;
    }

    disabledMinutes(selectedHour) {
        if (selectedHour == moment(this.state.startTime, 'h:mm a').hour()) {
            let arr = [];
            let end = moment(this.state.startTime, 'h:mm a').minutes();
            for (let i = 0; i <= end; i+=5) {
                arr.push(i);
            }
            return arr;
        }
    }

    setStartDate(date) {
        this.setState({ startDate: date.format('YYYY-MM-DD'), endDate: date.format('YYYY-MM-DD') });
    }

    setStartTime(time) {
        this.setState({ startTime: time.format("HH:mm") });
    }

    setEndDate(date) {
        this.setState({ endDate: date.format('YYYY-MM-DD') });
    }

    setEndTime(time) {
        this.setState({ endTime: time.format("HH:mm") });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        let newAppt = {
            title: this.state.title,
            startDate: this.state.startDate,
            startTime: this.state.startTime,
            endDate: this.state.endDate,
            endTime: this.state.endTime,
            displayStart: "",
            displayEnd: "",
            notes: this.state.notes,
            attendees: this.state.attendees.split(',')
        }
        let request = { appointment: newAppt, token: this.props.credentials.token };
        this.props.createAppointment(request);
        this.onClose();
    }

    onOpen() {
        this.setState({ showDrawer: true });
    }

    onClose() {
        this.setState({ showDrawer: false });
    }

    render() {
        return (
            <div className="appointment-form">
                <Button className="new-appointment" onClick={this.onOpen}>New Appointment</Button>
                <Drawer
                    title="New Appointment"
                    placement="left"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.showDrawer}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            <Input
                                placeholder="Title"
                                name="title"
                                required={true}
                                value={this.state.title}
                                onChange={this.onChange}
                            />
                        </FormItem>
                        <FormItem>
                            <DatePicker
                                disabledDate={this.disabledDates}
                                value={moment(this.state.startDate)}
                                placeholder="Start date"
                                format="YYYY-MM-DD"
                                onChange={this.setStartDate}
                            />
                            <TimePicker
                                placeholder="Start time"
                                use12Hours
                                minuteStep={5}
                                format="h:mm a"
                                value={moment(this.state.startTime, 'h:mm a')}
                                onChange={this.setStartTime}
                            />
                            <TimePicker
                                placeholder="End time"
                                use12Hours
                                minuteStep={5}
                                format="h:mm a"
                                disabledHours={this.disabledHours}
                                disabledMinutes={this.disabledMinutes}
                                value={moment(this.state.endTime, 'h:mm a')}
                                onChange={this.setEndTime}
                            />
                        </FormItem>
                        <FormItem>
                            <Input.TextArea
                                placeholder="Attendees (separate with comma)"
                                name="attendees"
                                value={this.state.attendees}
                                onChange={this.onChange}
                            />
                        </FormItem>
                        <FormItem>
                            <Input.TextArea
                                placeholder="Notes"
                                name="notes"
                                value={this.state.notes}
                                onChange={this.onChange}
                            />
                        </FormItem>
                        <FormItem>
                            <Button htmlType="submit">
                                Create
                            </Button>
                            <Button onClick={this.onClose}>
                                Cancel
                            </Button>
                        </FormItem>
                    </Form>
                </Drawer>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    response: state.appointments.response,
    credentials: state.users.credentials
});

export default connect(mapStateToProps, { createAppointment })(AppointmentForm);