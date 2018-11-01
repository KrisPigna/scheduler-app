import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import './Landing.css';
import { connect } from 'react-redux'
import { createUser, loginUser, clearUser } from '../../actions/userActions'

import { Form, Icon, Input, Button, Checkbox, Tabs, Layout, Modal } from 'antd';

const FormItem = Form.Item;

const { Content, Header } = Layout;

class Landing extends Component {
    constructor(props) {
        super(props)

        this.createUser = this.createUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.toggleRemember = this.toggleRemember.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateConfirm = this.validateConfirm.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            remember: "false",
            validated: false,
            username: "",
            password: ""
        }
    }

    componentWillMount() {
        let cookie = document.cookie;
        if (cookie != "") {
            let user = {
                username: "",
                password: "",
                remember: "",
                cookie: cookie
            }
            this.props.loginUser(user);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.credentials !== null && this.props.credentials !== prevProps.credentials) {
            if (this.props.credentials.failed == true) {
                Modal.error({
                    content: "Username or password is incorrect"
                })
            }
            else {
                if (this.props.credentials.cookie !== undefined) {
                    document.cookie = 'rememberme' + '=' + this.props.credentials.cookie;
                }
                this.setState({ validated: true });
            }
        }
        if (this.props.newUser.created === true) {
            let user = {
                username: this.props.form.getFieldValue("username"),
                password: this.props.form.getFieldValue("password"),
                remember: "false",
                cookie: null
            }
            this.props.loginUser(user);
        }
        if (this.props.newUser.created === false) {
            let cause = this.props.newUser.duplicate;
            Modal.error({
                content: "An account with this " + cause + " already exists."
            });
            this.props.clearUser();
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    toggleRemember() {
        if (this.state.remember == "false") {
            this.setState({ remember: "true" });
        }
        else if (this.state.remember == "true") {
            this.setState({ remember: "false" });
        }
    }

    validateUsername(rule, value, callback) {
        try {
            if (value.length < 6) {
                callback('Username must be at least 6 characters');
            }
            else {
                callback();
            }
        }
        catch (err) {
           
        }

    }

    validatePassword(rule, value, callback) {
        const form = this.props.form;
        let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

        try {
            if (value.length < 8 || value.length > 16) {
                callback("Password must be between 8 and 16 characters in length");
            }
            else if (regularExpression.test(value) === false) {
                callback("Password must contain at least one number and one special character");
            }
            else if (value !== form.getFieldValue("confirm")) {
                callback("Passwords do not match");
            }
            else {
                form.validateFields(['confirm'], { force: true });
                callback();
            }
        }
        catch (err) {
        
        }

    }

    validateConfirm(rule, value, callback) {
        const form = this.props.form;

        try {
            if (value !== form.getFieldValue("password")) {
                callback("Passwords do not match");
            }
            else {
                form.validateFields(['password'], { force: true });
                callback();
            }
        }
        catch (err) {
        
        }
    }


    createUser(e) {
        e.preventDefault();
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                let user = {
                    username: form.getFieldValue("username"),
                    email: form.getFieldValue("email"),
                    password: form.getFieldValue("password")
                }
                this.props.createUser(user);
            }
        });
    }

    loginUser(e) {
        e.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password,
            remember: this.state.remember,
            cookie: null
        }
        this.props.loginUser(user);
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        if (this.state.validated === true) {
            return (
                <Redirect to="/dashboard/calendar" />
            )
        }
        return (
            <Layout>
                <Header className="header">
                    Scheduler App
                </Header>
                <Content>
                    <div className="tab-container">
                        <Tabs defaultActiveKey="1">
                            <Tabs.TabPane tab="Login" key="1">
                                <Form className="form" onSubmit={this.loginUser}>
                                    <FormItem>
                                        <Input
                                            prefix={<Icon type="user" />}
                                            placeholder="Username"
                                            name="username"
                                            value={this.state.username}
                                            required={true}
                                            message={this.state.nameMessage}
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
                                        <Checkbox onChange={this.toggleRemember} value={this.state.remember}>Remember me</Checkbox>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Log in
                        </Button>
                                    </FormItem>
                                </Form>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Sign Up" key="2">
                                <Form className="form" onSubmit={this.createUser}>
                                    <FormItem>
                                        {getFieldDecorator('username', {
                                            rules: [{
                                                required: true, message: "Please enter your username",
                                            }, {
                                                validator: this.validateUsername,
                                            }],
                                        })(
                                            <Input
                                                prefix={<Icon type="user" />}
                                                placeholder="Username"
                                                name="username"
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('email', {
                                            rules: [{
                                                required: true, message: "Please enter your email",
                                            }],
                                        })(
                                            <Input prefix={<Icon type="mail" />}
                                                type="email"
                                                placeholder="email"
                                                name="email"
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('password', {
                                            rules: [{
                                                required: true, message: 'Please enter your password',
                                            },
                                            {
                                                validator: this.validatePassword,
                                            }],
                                        })(
                                            <Input
                                                prefix={<Icon type="lock" />}
                                                type="password"
                                                placeholder="Password"
                                                name="password"
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('confirm', {
                                            rules: [{
                                                required: true, message: 'Please confirm your password',
                                            },
                                            {
                                                validator: this.validateConfirm,
                                            }],
                                        })(
                                            <Input
                                                prefix={<Icon type="lock" />}
                                                type="password"
                                                placeholder="Confirm password"
                                                name="confirm"
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Sign Up
                        </Button>
                                    </FormItem>
                                </Form>
                            </Tabs.TabPane>
                        </Tabs >
                    </div>
                </Content>
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    credentials: state.users.credentials,
    username: state.users.username,
    newUser: state.users.newUser
});

const WrappedRegistrationForm = Form.create()(Landing);

export default connect(mapStateToProps, { createUser, loginUser, clearUser })(WrappedRegistrationForm);
