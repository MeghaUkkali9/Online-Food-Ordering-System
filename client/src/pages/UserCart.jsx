import React, * as react from "react";
import api from "../api";
import "../css/rating.css";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavItem,
    MDBBtn,
    MDBContainer,
    MDBDataTable
} from "mdbreact";

class UserCart extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            rating: ""
        };

        this.getCartData();
        this.handleChange = this.handleChange.bind(this);

    };
    handleChange = async event => {
        const rating = event.target.value;
        this.setState({ rating });
      };
    // handleChange(event) {
    //     console.log(event.target.value);
    //     this.setState({ rating: event.target.value });
    //     console.log(this.state.rating);
    // }
    getCartData = async () => {
        let tableColumns = [
            {
                label: 'Dish Name',
                field: 'name',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Category',
                field: 'category',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Price',
                field: 'price',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Quantity',
                field: 'Quantity',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Rating',
                field: 'rating',
                sort: 'asc',
                width: 100
            },
            {
                label: '',
                field: 'delete_button',
                sort: 'asc',
                width: 100
            }
        ];

        var data = {
            columns: tableColumns,
            rows: ""
        };

        var tableRow = '{"tableRow":[]}';
        var row = JSON.parse(tableRow);

        const cartData = {
            email: this.props.location.state.detail.email
        };

        
        await api.GetCartData(cartData).then(res => {
            let total = 0;

            if (res.data.success) {
                const { rating } = this.state;
                res.data.cartItemMap.map((cartItems, i) => {
                    row['tableRow'].push({
                        "name": cartItems.Dishname, "category": cartItems.Category, "price": cartItems.Price, "Quantity": cartItems.Quantity,
                        "rating": <div >
                            <input
                                placeholder="rating"
                                name="rating"
                                type="number"
                                value={rating}
                                onChange={this.handleChange}
                            /></div>,
                        "delete_button": <MDBBtn color="primary" onClick={e => this.deleteItem(e, cartItems.Dishname)} >Delete Item</MDBBtn>
                    });

                    // total = total.toFixed(2);

                    total = cartItems.Price * cartItems.Quantity + parseFloat(total);

                });
            } else {
                window.alert(`error`);
            }

            data.rows = row['tableRow'];
            console.log('new data', data);
            this.setState({ data });
            this.setState({ total });
        });
    };

    checkout = async (e) => {
        e.preventDefault();
        console.log("clicked checkout");
        const data = {
            email: this.props.location.state.detail.email,
            rating: this.state.rating
        }
        await api.CheckOut(data).then(res => {
            console.log("added into transaction table");
            if (res.data.success) {
                window.alert("could  add into transaction");
                window.location.reload(false);

            } else {
                window.alert("could   not add into transaction");
            }
        })
    }
    deleteItem = async (e, Dishname) => {
        e.preventDefault();
        const cartDataDelete = {
            email: this.props.location.state.detail.email,
            Dishname: Dishname
        };
        await api.DeleteCartData(cartDataDelete).then(res => {
            if (res.data.success) {
                console.log(res.data.Dishname, " is deleted.");
                window.location.reload(false);
            }
            else {
                window.alert("Error in deleting item.");
            }
        });
    }
    Home = async () => {
        const params = {
            user_first_name: this.props.location.state.detail.user_first_name,
            email: this.props.location.state.detail.email
        };
        this.props.history.push({
            pathname: "/user/view",
            state: { detail: params }
        });

    }
    logout = async () => {
        console.log("data" + this.props.location.state.detail);
        const token = this.props.location.state.detail;
        await api.LogoutService(token).then(res => {
            if (res.data.success) {
                window.alert(`User sesssion deleted successfully`);
                console.log(res);

                this.props.history.push({
                    pathname: "/login/"
                });
            } else {
                window.alert(`User Information not found successfully`);
            }
        });
    };

    render() {

        return (
            <header>
                <MDBNavbar color="indigo" dark expand="md" fixed="top">
                    <MDBNavbarBrand href="/">
                        <strong>Online Food Delivery</strong>
                    </MDBNavbarBrand>
                    {!this.state.isWideEnough && (
                        <MDBNavbarToggler onClick={this.onClick} />
                    )}
                    <MDBCollapse isOpen={this.state.collapse} navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem active>
                                <MDBBtn color="primary" onClick={e => this.Home(e)}>
                                    Home
                      </MDBBtn>
                            </MDBNavItem>
                        </MDBNavbarNav>

                        <MDBNavbarNav right>
                            <MDBNavbarBrand>
                                <strong>
                                    Welcome {this.props.location.state.detail.user_first_name}
                                </strong>
                            </MDBNavbarBrand>
                            <MDBNavItem>
                                <MDBBtn color="primary" onClick={e => this.logout(e)}>
                                    Logout
                      </MDBBtn>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
                <MDBContainer>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </MDBContainer>
                <MDBContainer>
                    <MDBDataTable
                        striped
                        bordered
                        hover
                        data={this.state.data}
                    />
                </MDBContainer>


                <div className="text-center">
                    <h4>TOTAL:  {this.state.total}</h4>

                    <MDBBtn color="primary" onClick={e => this.checkout(e)} >Check Out</MDBBtn>
                </div>

            </header>

        );

    }
}

export default UserCart;