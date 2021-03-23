import React from "react";
import axios from 'axios';
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
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";

const Wrapper = styled.div.attrs({
    className: "form-group"
})`
  margin: 0 30px;
`;
const BASE_URL = 'http://localhost:3001/';


class DeleteDishItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            imageUrls: [],
            message: '',
            DishName: '',
            Category: '',
            Price: '',
            ImageUrl: ''
        }
    }
    
    
    render() {
        alert("Do you want to delete dish item?")
            alert('Delete Successfull');
    }
}
export default DeleteDishItem;