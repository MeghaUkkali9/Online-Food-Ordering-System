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
    MDBCollapse,
    MDBContainer
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";

const Wrapper = styled.div.attrs({
    className: "form-group"
})`
  margin: 0 30px;
`;

class UpdateDishItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            DishName: '',
            Price: '',
            detail: ''
        }
    }
    handleChangeInputDishname = async event => {
        const DishName = event.target.value;
        this.setState({ DishName });
    };

    handleChangeInputPrice = async event => {
        const Price = event.target.value;
        this.setState({ Price });
    };


    updateItem = async (e) => {
        e.preventDefault();
        let Dishname = this.state.DishName;
        let Price = this.state.Price;
        let Id = this.props.location.state.detail.Id;
       
        const payload = {
            Dishname,
            Price,
            Id
        };
        console.log('payload', payload);
        await api.UpdateItem(payload).then(res => {
            if(res.data.success){
            window.alert(res.data.message);
            const params = {
                user_first_name: this.props.location.state.detail.user_first_name
            };
            this.props.history.push({
                pathname: "/admin/view/",
                state: { detail: params }
            });
        }else{
            window.alert(res.data.message);
            const params = {
                user_first_name: this.props.location.state.detail.user_first_name
            };
            this.props.history.push({
                pathname: "/admin/view/",
                state: { detail: params }
            });
        }
        });
    }

    render() {
        const { DishName, Price } = this.state;
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
                                    
                                    </MDBCollapse>
                                </MDBNavbar>
                            </Router>
                            <br />
                            <br />
                            <br />
                            <br />

                            <MDBContainer>
                                <p className="h4 text-center mb-4">Update Dish Item</p>
                                <div className="form-group">
                                    <label>Dish name</label>
                                    <input
                                        type="text"
                                        placeholder={this.props.location.state.detail.Dishname}
                                        name="name"
                                        size="30"
                                        value={DishName}
                                        required
                                        onChange={this.handleChangeInputDishname}
                                        className="form-control"
                                    />
                                    <FieldFeedbacks for="name">
                                        <FieldFeedback when="*" />
                                        <FieldFeedback when="valueMissing" />
                                    </FieldFeedbacks>
                                </div>

                                <div className="form-group">
                                    <label>Price</label>
                                    <input
                                        type="text"
                                        placeholder="Price in $$"
                                        name="price"
                                        size="30"
                                        value={Price}
                                        required
                                        onChange={this.handleChangeInputPrice}
                                        className="form-control"
                                    />
                                    <FieldFeedbacks for="name">
                                        <FieldFeedback when="*" />
                                        <FieldFeedback when="valueMissing" />
                                    </FieldFeedbacks>
                                </div>

                                <p className="text-info">{this.state.message}</p>
                                <div className="text-center mt-4">
                                    <button
                                        type="submit"
                                        onClick={e=>this.updateItem(e)}
                                        className="btn btn-primary btn-block">
                                        Update Item
                                    </button>
                                </div>
                            </MDBContainer>
                        </header>
                    </div>

                </Wrapper>
            </FormWithConstraints>
        );
    }
}
export default UpdateDishItem;