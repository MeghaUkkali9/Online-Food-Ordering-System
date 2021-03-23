import React, { Component } from "react";
import { FieldFeedback, FieldFeedbacks, FormWithConstraints } from "react-form-with-constraints";
import styled from "styled-components";
import api from "../api";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBCollapse, MDBNavItem, MDBNavLink } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

const Wrapper = styled.div.attrs({
    className: "form-group"
})`
  margin: 0 30px;
`;

class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    handleChangeInputEmail = async event => {
        const email = event.target.value;
        const fields = await this.form.validateFields(event.currentTarget);

        const fieldIsValid = fields.every(field => field.isValid());
        if (fieldIsValid) {
            this.setState({ email });
        } else {
            this.setState({ email });
        }
    };

    handleChangeInputPassword = async event => {
        const password = event.target.value;
        const fields = await this.form.validateFields(event.currentTarget);

        const fieldIsValid = fields.every(field => field.isValid());
        if (fieldIsValid) {
            this.setState({ password });
        } else {
            this.setState({ password });
        }
    };

    onSubmit = async e => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        };

        await api.ResetService(data).then(res => {
            if (res.data.success) {
                window.alert("Password updated succssfully");
                this.props.history.push({
                    pathname: "/login"
                });
            } else {
                window.alert(`Email is not found`);
            }
            //window.alert(`User Information found successfully`);
        });
    };

    render() {
        const { email, password } = this.state;
        return (
            <FormWithConstraints
                ref={form => (this.form = form)}
                noValidate
            >
                <Wrapper>
                    <div>
                        <header>
                            <Router>
                                <MDBNavbar color="indigo" dark expand="md" fixed="top">
                                    <MDBNavbarBrand href="/">
                                        <strong>Online Food Delivery</strong>
                                    </MDBNavbarBrand>
                                    <MDBCollapse isOpen={this.state.collapse} navbar>
                                        <MDBNavbarNav left>
                                            <MDBNavItem active>
                                                <MDBNavLink to="/">Home</MDBNavLink>
                                            </MDBNavItem>
                                        </MDBNavbarNav>

                                    </MDBCollapse>
                                </MDBNavbar>
                            </Router>
                        </header>
                    </div>
                    <main>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <div className="auth-wrapper">
                            <div className="auth-inner">
                                <h3>Reset Password</h3>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input
                                        placeholder="Enter email"
                                        name="username"
                                        id="username"
                                        value={email}
                                        onChange={this.handleChangeInputEmail}
                                        required
                                        pattern=".{3,}"
                                        type="email"
                                        className="form-control"
                                    />
                                    <FieldFeedbacks for="username">
                                        <FieldFeedback when="tooShort">Too short</FieldFeedback>
                                        <FieldFeedback when="*" />
                                        <FieldFeedback when="valid">Looks good!</FieldFeedback>
                                    </FieldFeedbacks>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        // pattern="(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^*])[a-zA-Z0-9!@#$%^*]{6,16}$/)"
                                        pattern=".{5,}"
                                        onChange={this.handleChangeInputPassword}
                                        required
                                        className="form-control"
                                    />
                                    <FieldFeedbacks for="password">
                                        <FieldFeedback when="valueMissing" />
                                        <FieldFeedback when="patternMismatch">
                                            Should be at least 5 characters long
                                </FieldFeedback>
                                        <FieldFeedback when={value => !/\d/.test(value)} warning>
                                            Should contain numbers
                                </FieldFeedback>
                                        <FieldFeedback when={value => !/[a-z]/.test(value)} warning>
                                            Should contain small letters
                                </FieldFeedback>
                                        <FieldFeedback when={value => !/[A-Z]/.test(value)} warning>
                                            Should contain capital letters
                                </FieldFeedback>
                                        <FieldFeedback when={value => !/\W/.test(value)} warning>
                                            Should contain special characters
                                </FieldFeedback>
                                    </FieldFeedbacks>
                                </div>
                                <button onClick={this.onSubmit} type="submit" className="btn btn-primary btn-block">Submit</button>
                                <p className="forgot-password text-right"><a href={"/login"}>Cancel</a>
                                </p>
                            </div>
                        </div>
                    </main>
                </Wrapper>
            </FormWithConstraints>
        );
    }
}

export default ForgotPassword;
