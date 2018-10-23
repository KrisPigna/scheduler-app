import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Icon, Dropdown, Menu } from 'antd';

class User extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);

        this.state = {
            validated: true,
            username: localStorage.getItem("username")
        }
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        this.setState({ validated: false });
    }

    render() {
        if (this.state.validated === false) {
            return (
                <Redirect to="/" />
            )
        }

        return (
            <Menu mode="horizontal">
                <Menu.Item>
                    <Icon type="user" /> Hi, {this.state.username}
                </Menu.Item>
                <Menu.Item onClick={this.logout}>
                    Logout
                </Menu.Item>
            </Menu>
        )
    }
}

export default User;
