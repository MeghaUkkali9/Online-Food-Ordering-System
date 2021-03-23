import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Collapse = styled.div.attrs({
  className: "collpase navbar-collapse"
})``;

const List = styled.div.attrs({
  className: "navbar-nav mr-auto"
})``;

const Item = styled.div.attrs({
  className: "collpase navbar-collapse"
})``;

class Links extends Component {
  render() {
    return (
      <React.Fragment>
        <Link to="/" className="navbar-brand">
          Online Food Ordering System
        </Link>
        <Collapse>
          <List>
            <Item>
              <Link to="/user/create" className="nav-link">
                Register
              </Link>
            </Item>

            <Item>
              <Link to="/user/login" className="nav-link">
                Log In
              </Link>
            </Item>
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default Links;
