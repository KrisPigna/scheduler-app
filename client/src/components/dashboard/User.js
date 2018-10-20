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

        const menu = (
            <Menu>
                <Menu.Item key="1" onClick={this.logout}>Logout</Menu.Item>
            </Menu>)

        return (
            <Dropdown.Button className="button" overlay={menu} trigger={['click']}>
                <Icon type="user" /> Hi, {this.state.username}
            </Dropdown.Button>
        )
    }
}

export default User;
