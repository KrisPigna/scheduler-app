import React, { Component } from 'react';
import { Calendar, Drawer, Button, Icon } from 'antd';
import moment from 'moment';
import './AppointmentCalendar.css'

export default class AppointmentCalendar extends Component {
    constructor(props) {
        super(props);

        this.onPanelChange = this.onPanelChange.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.prevMonth = this.prevMonth.bind(this);

        let day = new Date();
        let dd = day.getDate();
        let mm = day.getMonth() + 1;
        let yyyy = day.getFullYear();

        let today = yyyy + '-' + mm + '-0' + dd;

        console.log(today);

        this.state = {
            fullscreen: true,
            value: moment(today),
            selectedValue: moment(today)
        }
    }

    componentDidMount() {
        console.log(this.state.value)
        window.addEventListener('resize', this.toggleFullscreen);
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
        console.log("event");
    }

    onPanelChange(value, mode) {
        console.log(value, mode);
        this.setState({value: value})
    }

    onOpen(newValue) {
        console.log(newValue);
        this.setState({ showDrawer: true, value: newValue, selectedValue: newValue });
    }

    onClose() {
        this.setState({ showDrawer: false });
    }

    nextMonth() {
        let newMonth = (parseInt(this.state.value.format('MM')) + 1);
        if (newMonth > 12) {
            newMonth = 1;
        }
        console.log(newMonth);
        let newValue = this.state.value.format('YYYY') + '-' + newMonth + '-01';
        this.setState({ value: moment(newValue) })
    }

    prevMonth() {
        let newMonth = (parseInt(this.state.value.format('MM')) - 1);
        if (newMonth < 1) {
            newMonth = 12;
        }
        console.log(newMonth);
        let newValue = this.state.value.format('YYYY') + '-' + newMonth + '-01';
        this.setState({ value: moment(newValue) })
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
                    value={this.state.value}
                    fullscreen={this.state.fullscreen}
                    onSelect={this.onOpen}
                    onPanelChange={this.onPanelChange}
                />
                <Drawer
                    title={this.state.selectedValue.format('MM-DD-YYYY')}
                    placement="bottom"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.showDrawer}
                >

                </Drawer>
            </div >
        )
    }
}
