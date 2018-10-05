import React, { Component } from 'react'
import { Drawer, DatePicker, Button, Form } from 'antd';

import './AppointmentForm.css'

const FormItem = Form.Item;

class AppointmentForm extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);

        this.state = {
            time: null,
            showDrawer: false
        }
    }

    onChange(time) {
        console.log(time);
        this.setState({ time: time });
    }

    onOpen() {
        this.setState({ showDrawer: true });
    }

    onClose() {
        this.setState({ showDrawer: false });
    }

    render() {
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
                    <Form>
                        <FormItem label="Start">
                            <DatePicker showTime format="YYYY-MM-DD HH:mm" onChange={this.onChange} />
                        </FormItem>
                        <FormItem label="End">
                            <DatePicker showTime format="YYYY-MM-DD HH:mm" onChange={this.onChange} />
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

export default AppointmentForm;