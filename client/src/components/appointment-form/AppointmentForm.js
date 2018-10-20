import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createAppointment } from '../../actions/appointmentActions';
import { Drawer, DatePicker, TimePicker, Button, Form, Input, Modal } from 'antd';

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

        let day = new Date();
        let dd = day.getDate();
        let mm = day.getMonth() + 1;
        let yyyy = day.getFullYear();
        let today = yyyy + '-' + mm + '-0' + dd;

        this.state = {
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
        console.log(this.props.response);
        if (this.props.response._id) {
            if (this.props.response._id != prevProps.response._id) {
                Modal.success({
                    content: "Appointment created"
                });
            }
        }
    }

    setStartDate(date) {
        this.setState({ startDate: date.format('YYYY-MM-DD') });
    }

    setStartTime(time) {
        this.setState({ startTime: time.format("HH:mm") });
        console.log(this.state.startTime);
    }

    setEndDate(date) {
        this.setState({ endDate: date.format('YYYY-MM-DD') });
        console.log(this.state.endDate);
    }

    setEndTime(time) {
        this.setState({ endTime: time.format("HH:mm") });
        console.log(this.state.endTime);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.attendees);
        let appointment = {
            title: this.state.title,
            startDate: this.state.startDate,
            startTime: this.state.startTime,
            endDate: this.state.endDate,
            endTime: this.state.endTime,
            notes: this.state.notes,
            attendees: this.state.attendees.split(',')
        }
        console.log(JSON.stringify(appointment));
        this.props.createAppointment(appointment);
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
                                value={this.state.title}
                                onChange={this.onChange}
                            />
                        </FormItem>
                        <FormItem>
                            <DatePicker
                                placeholder="Start date"
                                format="YYYY-MM-DD"
                                onChange={this.setStartDate}
                            />
                            <TimePicker
                                placeholder="Start time"
                                use12Hours
                                minuteStep={5}
                                format="h:mm a"
                                onChange={this.setStartTime}
                            />
                        </FormItem>
                        <FormItem>
                            <DatePicker
                                placeholder="End date"
                                format="YYYY-MM-DD"
                                onChange={this.setEndDate}
                            />
                            <TimePicker
                                placeholder="End time"
                                use12Hours
                                minuteStep={5}
                                format="h:mm a"
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
    response: state.appointments.response
});

export default connect(mapStateToProps, { createAppointment })(AppointmentForm);