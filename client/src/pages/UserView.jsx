import React, * as react from "react";
import api from "../api";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBMask,
  MDBView,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBContainer
} from "mdbreact";
import { Redirect } from "react-router-dom";
import apetizer from "../css/apetizer.jpg";
import meal from "../css/meal.jpg";
import dessert from "../css/dessert.jpg";
import drinks from "../css/drinks.jpg";

class UserView extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
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

  getApetizer = async () => {
    console.log('get apetizer push');
    const params = {
      user_first_name: this.props.location.state.detail.user_first_name,
      email: this.props.location.state.detail.email
    };
    const data = {
      category: 'Apetizer'
    };
    await api.GetAppetizerItem(data).then(res => {
      if (res.data.success) {
        console.log('found apetizer');
        console.log('res.data', res.data);
        params.dishItemMap = res.data;

        this.props.history.push({
          pathname: "/user/view/apetizer/",
          state: { detail: params }
        });
      } else {
        console.log('Items are not found apetizer');
      }
    });

  };

  getMeal = async () => {
    console.log('get Meal push');
    const params = {
      user_first_name: this.props.location.state.detail.user_first_name,
      email: this.props.location.state.detail.email
    };
    const data = {
      category: 'Meal'
    };
    await api.GetMealItem(data).then(res => {
      if (res.data.success) {
        console.log('found Meal');
        console.log('res.data', res.data);
        params.dishItemMap = res.data;

        this.props.history.push({
          pathname: "/user/view/meal/",
          state: { detail: params }
        });
      } else {
        console.log('not found Meal');
      }
    });
  };

  getDessert = async () => {
    const params = {
      user_first_name: this.props.location.state.detail.user_first_name,
      email: this.props.location.state.detail.email
    };
    const data = {
      category: 'Dessert'
    };

    await api.GetDessertItem(data).then(res => {
      if (res.data.success) {
        params.dishItemMap = res.data;
        this.props.history.push({
          pathname: "/user/view/dessert/",
          state: { detail: params }
        });
      } else {
        console.log('not found Dessert');
      }
    });
  };

  getDrinks = async () => {
    console.log('get Drinks push');
    const params = {
      user_first_name: this.props.location.state.detail.user_first_name,
      email: this.props.location.state.detail.email
    };
    const data = {
      category: 'Drinks'
    };
    await api.GetDrinkItem(data).then(res => {
      if (res.data.success) {
        console.log('found Drinks');
        console.log('res.data', res.data);
        params.dishItemMap = res.data;

        this.props.history.push({
          pathname: "/user/view/drinks/",
          state: { detail: params }
        });
      } else {
        console.log('not found Drinks');
      }
    });

    // <MDBNavbarNav left>
    //             <MDBNavItem active>
    //               <MDBNavLink to="#">Home</MDBNavLink>
    //             </MDBNavItem>
    //           </MDBNavbarNav>
  };
  Home = async () => {

    if (this.props.location.state.detail.user_first_name === 'admin') {
      const params = {
        user_first_name: this.props.location.state.detail.user_first_name
      };
      this.props.history.push({
        pathname: "/admin/view",
        state: { detail: params }
      });
    } else {
      const params = {
        user_first_name: this.props.location.state.detail.user_first_name,
        email: this.props.location.state.detail.email
      };
      this.props.history.push({
        pathname: "/user/view",
        state: { detail: params }
      });
    }
  }

  render() {
        if(this.props.location.state != null) {
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
            <br />
            <br />

            <MDBContainer>
              <MDBRow className="mt-4">
                <MDBCol md="6" onClick={() => this.getApetizer()}>
                  <MDBView hover zoom>
                    <img
                      src={apetizer}
                      className="img-fluid"
                      alt=""
                    />
                    <MDBMask className="flex-top">
                      <h2 className="black-text" ><strong>Apetizers</strong></h2>
                    </MDBMask>
                  </MDBView>
                </MDBCol>
                <MDBCol md="6" onClick={() => this.getMeal()}>
                  <MDBView hover zoom>
                    <img
                      src={meal}
                      className="img-fluid"
                      alt=""
                    />
                    <MDBMask className="flex-top">
                      <h2 className="black-text"><strong>Meal</strong></h2>
                    </MDBMask>
                  </MDBView>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-4">
                <MDBCol md="6" onClick={() => this.getDessert()}>
                  <MDBView hover zoom>
                    <img
                      src={dessert}
                      className="img-fluid"
                      alt=""
                    />
                    <MDBMask className="flex-top">
                      <h2 className="black-text"><strong>Dessert</strong></h2>
                    </MDBMask>
                  </MDBView>
                </MDBCol>
                <MDBCol md="6" onClick={() => this.getDrinks()}>
                  <MDBView hover zoom>
                    <img
                      src={drinks}
                      className="img-fluid"
                      alt=""
                    />
                    <MDBMask className="flex-top">
                      <h2 className="black-text"><strong>Drinks</strong></h2>
                    </MDBMask>
                  </MDBView>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </header>
        );
      }
    else {
        return <Redirect to="/login" />;
      }
    }
  }

  export default UserView;
