import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Landing.css';
import { connect } from 'react-redux'
import { createUser, loginUser } from '../../actions/userActions'

import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class Landing extends Component {
    constructor(props) {
        super(props)

        this.createUser = this.createUser.bind(this);
        this.onChange = this.onChange.bind(this);
        this.loginUser = this.loginUser.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            confirm: ""
        }
    }

    componentDidUpdate() {
        console.log(this.props.token);
        if (this.props.token !== null) {
            localStorage.setItem("token", this.props.token);
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    createUser(e) {
        e.preventDefault();
        let user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        console.log(user);

        this.props.createUser(user);
    }

    loginUser(e) {
        e.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(user);

        this.props.loginUser(user);
    }

    render() {
        return (
            <div className="container">
                <div className="form">
                    <Form onSubmit={this.loginUser}>
                        <FormItem>
                            <Input 
                                prefix={<Icon type="user" />}
                                placeholder="Username"
                                name="username"
                                value={this.state.username}
                                required={true} 
                                message="Please input your username!"
                                onChange={this.onChange} 
                            />
                        </FormItem>
                        <FormItem>
                            <Input 
                                prefix={<Icon type="lock" />}
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                required={true}
                                message="Please input your Password!"
                                onChange={this.onChange}
                            />
                        </FormItem>
                        <FormItem>
                            <Checkbox>Remember me</Checkbox>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                        </Button>
                        </FormItem>
                    </Form>
                    <Link to="/dashboard/calendar">Sign In</Link>
                </div>
                <div className="form">
                    <Form onSubmit={this.createUser}>
                        <FormItem>
                            <Input 
                                prefix={<Icon type="user" />}
                                placeholder="Username"
                                name="username"
                                value={this.state.username}
                                required={true} 
                                message="Please input your username!"
                                onChange={this.onChange} 
                            />
                        </FormItem>
                        <FormItem>
                            <Input prefix={<Icon type="mail" />}
                                type="email"
                                placeholder="email"
                                name="email"
                                value={this.state.email}
                                required={true}
                                message="Please input your username!"
                                onChange={this.onChange}
                            />
                        </FormItem>
                        <FormItem>
                            <Input 
                                prefix={<Icon type="lock" />}
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                required={true}
                                message="Please input your Password!"
                                onChange={this.onChange}
                            />
                        </FormItem>
                        <FormItem>
                            <Input 
                                prefix={<Icon type="lock" />}
                                type="password"
                                placeholder="Password"
                                name="confirm"
                                value={this.state.confirm}
                                required={true}
                                message="Please input your Password!"
                                onChange={this.onChange}
                            />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Sign Up
                        </Button>
                        </FormItem>
                    </Form>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    token: state.users.token
});

export default connect(mapStateToProps, { createUser, loginUser })(Landing);
