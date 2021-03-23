import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBMask, MDBView, MDBBtn } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';



class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
        };

    }

    render() {
        return (
            <div>
                <header>
                    <Router>
                        <MDBNavbar color="indigo" dark expand="md" fixed="top">
                            <MDBNavbarBrand href="/">
                                <strong>Online Food Delivery</strong>
                            </MDBNavbarBrand>
                            {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />}
                            <MDBCollapse isOpen={this.state.collapse} navbar>
                                <MDBNavbarNav left>
                                    <MDBNavItem active>
                                        <MDBNavLink to="#">Home</MDBNavLink>
                                    </MDBNavItem>
                                </MDBNavbarNav>
                                <MDBNavbarNav right>
                                    <MDBNavItem>
                                        <MDBBtn color="primary" href="/login">Login</MDBBtn>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBBtn color="primary" href="/signup">SignUp</MDBBtn>
                                    </MDBNavItem>
                                </MDBNavbarNav>
                            </MDBCollapse>
                        </MDBNavbar>
                    </Router>

                    <MDBView src="https://mdbootstrap.com/img/Others/documentation/img%20(42)-mini.jpg">
                        <MDBMask overlay="black-light" className="flex-center flex-column text-white text-center">
                            <h1>Online Food Delivery</h1>
                            <h3>Please login into our system to order food online</h3>
                            <br />

                        </MDBMask>
                    </MDBView>
                </header>

                <main>
                    <MDBContainer className="text-center my-5">
                        <p align="justify">The online food delivery system is developed as part of react framework project where user can sign up to view food items to order online.
                        Recurring user can login into the system and can select food items, add it to cart and checkout the order. The online food delivery system is developed as part of react framework project where user can sign up to view food items to order online.
                        Recurring user can login into the system and can select food items, add it to cart and checkout the order. The online food delivery system is developed as part of react framework project where user can sign up to view food items to order online.
                            Recurring user can login into the system and can select food items, add it to cart and checkout the order. </p>
                    </MDBContainer>
                </main>
            </div>
        );
    }
}

export default HomePage;