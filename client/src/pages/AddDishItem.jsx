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
const BASE_URL = 'http://localhost:3001/';


class AddDishItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            imageUrls: [],
            message: '',
            DishName: '',
            Category: '',
            Price: '',
            ImageUrl: '',
            detail: ''
        }
    }
    handleChangeInputDishname = async event => {
        const DishName = event.target.value;
        this.setState({ DishName });
    };
    handleChangeInputCategory = async event => {
        const Category = event.target.value;
        this.setState({ Category });
    };
    handleChangeInputPrice = async event => {
        const Price = event.target.value;
        this.setState({ Price });
    };
    selectImages = (event) => {
        let images = []
        for (var i = 0; i < event.target.files.length; i++) {
            images[i] = event.target.files.item(i);
        }
        images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
        let message = `${images.length} valid image(s) selected`
        this.setState({ images, message })
    }

    addItem = async (e) => {

        let Dishname = this.state.DishName;
        let Category = this.state.Category;
        let Price = this.state.Price;
        let ImageUrl = this.state.ImageUrl;
        const payload = {
            Dishname,
            Category,
            Price,
            ImageUrl
        };
        console.log('payload', payload);
        await api.AddItem(payload).then(res => {
            console.log('res add item', res);
            //-----------------------

            const params = {
                user_first_name: this.props.location.state.detail.user_first_name,
                dish_name: res.data.dish_name,
                category: res.data.category,
                price: res.data.price,
                id: res.data.id
            };
            // based on user name direct to admin page or user view page
            if (res.data.success) {
                window.alert(res.data.message);
                this.props.history.push({
                    pathname: "/admin/view/",
                    state: { detail: params }
                });
            }else{
                window.alert(res.data.message);
                
            }
            //------------------------------
        });
    }

    uploadImages = async (e) => {
        e.preventDefault();

        let imageData;
        let imageUrl;
        this.state.images.map(image => {
            imageData = image;
            imageUrl = image.name;
        });
        const { DishName, Category, Price } = this.state;



        const data = new FormData();
        data.append("image", imageData, imageUrl);
        await api.UploadImage(data).then(res => {
            console.log('res', res);
            this.setState({
                imageUrls: [res.data.imageUrl, ...this.state.imageUrls],
                DishName: DishName,
                Category: Category,
                Price: Price,
                ImageUrl: res.data.imageUrl
            });
            this.addItem();

        });
    }

    render() {
        const { DishName, Category, Price } = this.state;
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
                            <br />
                            <MDBContainer>
                                <p className="h4 text-center mb-4">Add Dish Item</p>
                                <div className="form-group">
                                    <label>Dish name</label>
                                    <input
                                        type="text"
                                        placeholder="Dish name"
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
                                    <label>Category</label>
                                    <input
                                        type="text"
                                        placeholder="Category: Apetizer, Meal, Dessert, Drinks"
                                        name="name"
                                        size="30"
                                        value={Category}
                                        required
                                        onChange={this.handleChangeInputCategory}
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
                                <div className="form-group">

                                    <br />
                                    <label>Upload Image</label>
                                    <input
                                        placeholder="Image File"
                                        name="image"
                                        type="file"
                                        onChange={this.selectImages}
                                        required
                                        className="form-control"
                                    />
                                    <FieldFeedbacks for="image">
                                        <FieldFeedback when="*" />
                                    </FieldFeedbacks>
                                </div>
                                <p className="text-info">{this.state.message}</p>
                                <div className="text-center mt-4">
                                    <button
                                        type="submit"
                                        onClick={this.uploadImages}
                                        className="btn btn-primary btn-block"
                                    >
                                        Add Item
                                    </button>
                                </div>
                            </MDBContainer>
                        </header>
                    </div>
                    <main>
                        <div className="row col-lg-12">
                            {
                                this.state.imageUrls.map((url, i) => (
                                    <div className="col-lg-2" key={i}>
                                        <img src={BASE_URL + url} className="img-rounded img-responsive"
                                            alt="not available" /><br />
                                    </div>
                                ))
                            }
                        </div>

                    </main>
                </Wrapper>
            </FormWithConstraints>
        );
    }
}
export default AddDishItem;