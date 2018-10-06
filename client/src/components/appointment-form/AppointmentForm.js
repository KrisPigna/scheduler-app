import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Drawer, DatePicker, TimePicker, Button, Form, Input } from 'antd';

import './AppointmentForm.css'

const FormItem = Form.Item;

class AppointmentForm extends Component {
    constructor(props) {
        super(props);

        this.setStartTime = this.setStartTime.bind(this);
        this.setEndTime = this.setEndTime.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);

        this.state = {
            startTime: null,
            endTime: null,
            attendee: "",
            showDrawer: false,

        }
    }

    setStartTime(time) {
        this.setState({ startTime: time });
        console.log(this.state.startTime);
    }

    setEndTime(time) {
        this.setState({ endTime: time });
        console.log(this.state.endTime);
    }

    onChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        let appointment = {
            start: this.state.startTime.format('YYYY-MM-DD') + 'T' + this.state.startTime.format('HH:MM'),
            end: this.state.endTime.format('YYYY-MM-DD') + 'T' + this.state.endTime.format('HH:MM'),
            attendees: [this.state.attendee]
        }
        console.log(appointment);
        this.onClose();
    }

    onOpen() {
        this.setState({ showDrawer: true });
    }

    onClose() {
        this.setState({ showDrawer: false });
    }

    render() {
        const format = 'HH:mm';

        return (
            <div>
                <Button onClick={this.onOpen}>New Appointment</Button>
                <Drawer
                    title="New Appointment"
                    placement="left"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.showDrawer}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem label="Start">
                            <DatePicker
                                format="YYYY-MM-DD"
                                onChange={this.setStartTime}
                            />
                            <TimePicker
                                use12Hours
                                minuteStep={5}
                                format="h:mm a"
                            />
                        </FormItem>
                        <FormItem label="End">
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm"
                                onChange={this.setEndTime}
                            />
                            <TimePicker
                                use12Hours
                                minuteStep={5}
                                format="h:mm a"
                            />
                        </FormItem>
                        <FormItem>
                            <Input
                                placeholder="Attendee"
                                name="attendee"
                                value={this.state.attendee}
                                onChange={this.onChange}
                            />
                        </FormItem>
                        <FormItem>
                            <Button htmlType="submit">
                                Create
                            </Button>
                            <Button htmlType="submit" onClick={this.onClose}>
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
    appointments: state.appointments.appointments
});

export default connect(mapStateToProps, {  })(AppointmentForm);