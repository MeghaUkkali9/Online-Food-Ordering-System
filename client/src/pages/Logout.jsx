import React, { Component } from "react";
import api from "../api";
import styled from "styled-components";
const Container = styled.div.attrs({
  className: "container"
})`
  height: 150px;
`;
class Logout extends Component {
  logout = async () => {
    const data = {
      token: this.props.location.state.detail.user_token
    };

    await api.Logout(data).then(res => {
      if (res.data.success) {
        window.alert(`User sesssion deleted successfully`);
        console.log(res);

        this.props.history.push({
          pathname: "/login/"
        });
      } else {
        window.alert(`User Information not found successfully`);
      }
      //window.alert(`User Information found successfully`);
    });
  };
  render() {
    return <Container>{this.logout()}</Container>;
  }
}

export default Logout;
