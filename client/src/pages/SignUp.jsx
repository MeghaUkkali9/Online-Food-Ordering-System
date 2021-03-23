import React from "react";
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
  MDBNavLink
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";

const Wrapper = styled.div.attrs({
  className: "form-group"
})`
  margin: 0 30px;
`;

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Fname: "",
      Lname: "",
      email: "",
      phone: "",
      address: "",
      password: ""
    };
  }

  handleChange = async e => {
    // this.form.validateFields(event.target);
    // this.setState(event.target.value);
    const target = e.currentTarget;

    // Validates only the given fields and returns Promise<Field[]>
    const fields = await this.form.validateFields(target);

    const fieldIsValid = fields.every(field => field.isValid());
    if (fieldIsValid) console.log(`Field '${target.name}' is valid`);
    else console.log(`Field '${target.name}' is invalid`);

    if (this.form.isValid()) console.log("The form is valid");
    else console.log("The form is invalid");
  };

  handleChangeInputFName = async event => {
    console.log(event.target,'target');
    const Fname = event.target.value;
    this.setState({ Fname });
  };

  handleChangeInputLName = async event => {
    const Lname = event.target.value;
    this.setState({ Lname });
  };
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
  handleChangeInputPhone = async event => {
    const phone = event.target.value;
    this.setState({ phone });
  };
  handleChangeInputAddress = async event => {
    const address = event.target.value;
    this.setState({ address });
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

  handleIncludeUser = async e => {
    e.preventDefault();

    const fields = await this.form.validateForm();

    const formIsValid = fields.every(field => field.isValid());

    if (!formIsValid) {
      console.log("form is invalid: do not submit");
    } else {
      this.form.validateFields();
      console.log("form is valid: submit");
      const { Fname, Lname, email, phone, address, password } = this.state;

      const payload = {
        Fname,
        Lname,
        email,
        phone,
        address,
        password
      };
      await api.SignupService(payload).then(res => {
        if (res.data.success) {
          window.alert(`User Information inserted successfully`);
          this.props.history.push({
            pathname: "/login/"
          });
        } else {
          window.alert(
            `Email already exists. Please login or use another email`
          );
        }
      });
    }
  };

  render() {
    const { Fname, Lname, email, phone, address, password } = this.state;
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
                  </MDBCollapse>
                </MDBNavbar>
              </Router>
            </header>
          </div>
          <main>
            <br />
            <br />
            <br />
            <div className="auth-wrapper">
              <div className="auth-inner">
                <h3>Sign Up</h3>

                <div className="form-group">
                  <label>First name</label>
                  <input
                    type="text"
                    placeholder="First name"
                    name="name"
                    size="30"
                    value={Fname}
                    required
                    onChange={this.handleChangeInputFName}
                    className="form-control"
                  />
                  <FieldFeedbacks for="name">
                    <FieldFeedback when="*" />
                  </FieldFeedbacks>
                </div>

                <div className="form-group">
                  <label>Last name</label>
                  <input
                    type="text"
                    placeholder="Last name"
                    name="lname"
                    value={Lname}
                    onChange={this.handleChangeInputLName}
                    required
                    className="form-control"
                  />
                  <FieldFeedbacks for="lname">
                    <FieldFeedback when="*" />
                  </FieldFeedbacks>
                </div>

                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    name="username"
                    id="username"
                    value={email}
                    onChange={this.handleChangeInputEmail}
                    required
                    pattern=".{3,}"
                    className="form-control"
                  />
                  <FieldFeedbacks for="username">
                    <FieldFeedback when="tooShort">Too short</FieldFeedback>
                    <FieldFeedback when="*" />
                    <FieldFeedback when="valid">Looks good!</FieldFeedback>
                  </FieldFeedbacks>
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    placeholder="Phone number"
                    name="phone"
                    type="number"
                    value={phone}
                    onChange={this.handleChangeInputPhone}
                    required
                    className="form-control"
                  />
                  <FieldFeedbacks for="phone">
                    <FieldFeedback when="*" />
                  </FieldFeedbacks>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    placeholder="Address"
                    name="address"
                    type="text"
                    value={address}
                    onChange={this.handleChangeInputAddress}
                    required
                    className="form-control"
                  />
                  <FieldFeedbacks for="address">
                    <FieldFeedback when="*" />
                  </FieldFeedbacks>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    placeholder="Enter password"
                    name="password"
                    type="password"
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
                <button
                  type="submit"
                  onClick={this.handleIncludeUser}
                  className="btn btn-primary btn-block"
                >
                  Sign Up
                </button>
                <p className="forgot-password text-right">
                  Already registered <a href={"/login"}>sign in?</a>
                </p>
              </div>
            </div>
          </main>
        </Wrapper>
      </FormWithConstraints>
    );
  }
}

export default SignUp;
