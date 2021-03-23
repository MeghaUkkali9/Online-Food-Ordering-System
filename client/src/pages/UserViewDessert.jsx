import React, * as react from "react";
import api from "../api";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBBtn,
  MDBContainer
} from "mdbreact";

class UserViewDessert extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      meal: '../css/meal.jpg'

    };
    this.getDessertData();
  }

  shoppingCart = async () => {
    const params = {
      user_first_name: this.props.location.state.detail.user_first_name,
      email: this.props.location.state.detail.email
    };
    this.props.history.push({
      pathname: "/user/view/cart/",
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
  getDessertData = async () => {
    console.log("dessert view");
    console.log(this.props.location.state.detail.dishItemMap.dishItemMap[0].ImageUrl);
  };

  handleCart = async (e, Dishname, Category, Price) => {
    e.preventDefault();
    const payload = {
      email: this.props.location.state.detail.email,
      Dishname: Dishname,
      Price: Price,
      Category: Category
    };
    console.log("Dishname", Dishname);
    console.log("Category", Category);
    console.log("Price", Price);
    await api.AddToCart(payload).then(res => {
      if (res.data.success) {
        window.alert(`cart inserted successfully`);
      } else {
        window.alert(
          `Not inserted into cart`
        );
      }
    });
  };

  createTable = () => {
    let dishLength = this.props.location.state.detail.dishItemMap.dishItemMap.length;
    console.log('table', this.props.location.state.detail.dishItemMap.dishItemMap[0].ImageUrl);
    let rows = Math.round(((dishLength - 1) / 3) + 1);
    let columns = dishLength % 3;
    let rowData = [];
    let columnData = [];
    let tableData = [];

   
    let index = -1;
    for (let i = 0; i < rows; i++) {
      console.log("i ", i);
      for (let k = 0; k <= 2; k++) {
        index++;
        console.log("k ", k);
        if (index < dishLength) {
          let onClickValue = (i * 3) + k;
          let dishName = this.props.location.state.detail.dishItemMap.dishItemMap[onClickValue].Dishname;
          let category = this.props.location.state.detail.dishItemMap.dishItemMap[onClickValue].Category;
          let price = this.props.location.state.detail.dishItemMap.dishItemMap[onClickValue].Price;

          columnData.push(
            <div className="col-sm-4 mb-3 mb-md-0" key={index + k}>
              <div className="card card-cascade narrower" >
                <div className="view view-cascade overlay">
                  <img className="card-img-top"
                    src={require('../images/' + this.props.location.state.detail.dishItemMap.dishItemMap[index].ImageUrl)}
                    alt="appetizer menu snaps" />
                  <a>
                    <div className="mask rgba-white-slight"></div>
                  </a>
                </div>
                <div className="card-body card-body-cascade">

                  <h5 className="pink-text pb-2 pt-1"> {this.props.location.state.detail.dishItemMap.dishItemMap[index].Category}</h5>
                  <h4 className="font-weight-bold card-title">
                    {this.props.location.state.detail.dishItemMap.dishItemMap[index].Dishname}</h4>
                  <h5 className="pink-text pb-2 pt-1"> {this.props.location.state.detail.dishItemMap.dishItemMap[index].Price}</h5>
                  <a className="btn btn-unique" onClick={(e) => this.handleCart(e, dishName, category, price)} >Add to Cart</a>

                </div>
              </div>
              <br />
            </div>
          );
        }
      }
      rowData.push(<div className="row" key={index + i}>{columnData}<br /></div>);
      columnData = [];
    }
    console.log("Columndata", rowData);
    return rowData;
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
                <MDBBtn color='primary' onClick={e => this.shoppingCart(e)}>shopping_cart</MDBBtn>
              </MDBNavItem>
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
        <br />
        <br />

        <MDBContainer>
          {this.createTable().map(item => (
            item
          ))}

        </MDBContainer>

      </header>
    );
  }
}


export default UserViewDessert;