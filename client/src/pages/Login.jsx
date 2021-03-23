import React, { Component } from "react";
import api from "../api";
import {
  FormWithConstraints,
  FieldFeedbacks,
  FieldFeedback
} from "react-form-with-constraints";
import styled from "styled-components";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBBtn
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";

const Wrapper = styled.div.attrs({
  className: "form-group"
})`
  margin: 0 30px;
`;

class Login extends Component {
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
    this.setState({ password });
  };

  onSubmit = async e => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };

    await api.LoginService(data).then(res => {
      if (res.data.success) {
        window.alert(res.data.message);
        console.log(res);
        const params = {
          user_first_name: res.data.user,
          email: res.data.email,
          user_token: res.data.token
        };
        
        if(res.data.user === 'admin') {
          this.props.history.push({
            pathname: "/admin/view/",
            state: { detail: params }
          });
        } else {
          this.props.history.push({
            pathname: "/user/view/",
            state: { detail: params }
          });
        }
      } else {
        // redirect to login page with message either username or password didn't match
        window.alert(res.data.message);
      }
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <FormWithConstraints ref={form => (this.form = form)} noValidate>
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
                    <MDBNavbarNav right>
                      <MDBNavItem>
                        <MDBBtn color="primary" href="/signup">
                          SignUp
                        </MDBBtn>
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
            <div className="auth-wrapper">
              <div className="auth-inner">
                <h3>Log In</h3>
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="username"
                    id="username"
                    value={email}
                    onChange={this.handleChangeInputEmail}
                    required
                    pattern=".{3,}"
                  />
                  <FieldFeedbacks for="username">
                    <FieldFeedback when="tooShort">Too short</FieldFeedback>
                    <FieldFeedback when="*" />
                    <FieldFeedback when="valid">Looks good!</FieldFeedback>
                  </FieldFeedbacks>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    pattern="(?=.*[0-9])"
                    onChange={this.handleChangeInputPassword}
                  />
                </div>
                <button
                  onClick={this.onSubmit}
                  type="submit"
                  className="btn btn-primary btn-block"
                >
                  Submit
                </button>
                <p className="forgot-password text-right">
                  Forgot <a href={"/user/forgotPassword"}>password?</a>
                  <a href={"/signup"}> Register</a>
                </p>
              </div>
            </div>
          </main>
        </Wrapper>
      </FormWithConstraints>
    );
  }
}

export default Login;
