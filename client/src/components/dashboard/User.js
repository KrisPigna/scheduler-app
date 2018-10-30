import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Icon, Menu } from 'antd';

class User extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);

        this.state = {
            validated: true,
            username: this.props.username
        }
    }

    logout() {
        document.cookie = "rememberme = ;expires=Thu, 01 Jan 1970 00:00:01 GMT";
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

const mapStateToProps = state => ({
    username: state.users.username
});

export default connect(mapStateToProps, {})(User);
