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
    MDBContainer,
    MDBDataTable
} from "mdbreact";

class AdminView extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            data: { datasets: [], labels: [] }
        };
        this.getData();

    };

    getData = async () => {
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
                label: 'Image Url',
                field: 'url',
                sort: 'asc',
                width: 100
            },
            {
                label: '',
                field: 'update_button',
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
        await api.GetDishItem("data del").then(res => {
            if (res.data.success) {
                res.data.dishItemMap.map((dish, i) => {
                    row['tableRow'].push({
                        "name": dish.Dishname, "category": dish.Category, "price": dish.Price,
                        "url": dish.ImageUrl, "update_button": <MDBBtn color="primary" onClick={e => this.updateItem(e, dish.Dishname, dish._id)}  >Update Item</MDBBtn>,
                        "delete_button": <MDBBtn color="primary" onClick={e => this.deleteItem(e,dish.Dishname,dish.Category)} >Delete Item</MDBBtn>
                    });
                });
            } else {
                window.alert(`error`);
            }
        });
        data.rows = row['tableRow'];
        console.log('new data', data);
        this.setState({ data });
    };

    viewItem = async e => {
        e.preventDefault();
        const params = {
            user_first_name: this.props.location.state.detail.user_first_name,
            email: this.props.location.state.detail.email
        };
        this.props.history.push({
            pathname: "/user/view/",
            state: { detail: params }
        });
    }
    addItem = async e => {
        e.preventDefault();
        const params = {
            user_first_name: this.props.location.state.detail.user_first_name
        };
        this.props.history.push({
            pathname: "/admin/add",
            state: { detail: params }
        });
    }

    updateItem = async (e, Dishname, Id) => {
        e.preventDefault();

        const data = {
            user_first_name: this.props.location.state.detail.user_first_name,
            Dishname: Dishname,
            Id: Id
        }
        this.props.history.push({
            pathname: "/admin/update/",
            state: {detail: data}
        });
    }

    deleteItem = async (e, Dishname, Category) => {
        e.preventDefault();
        alert("Do you want to delete dish item?")
        alert('Delete Successfull');
        const cartDataDelete = {
            Dishname: Dishname,
            Category: Category
        };
        await api.DeleteAdminData(cartDataDelete).then(res => {
            if (res.data.success) {
                console.log(res.data.Dishname, " is deleted.");
                window.location.reload(false);
            }
            else {
                window.alert("Error in deleting item.");
            }
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
                    <MDBBtn color="primary" onClick={e => this.viewItem(e)} href="/user/view">
                        View Item
                      </MDBBtn>
                    <MDBBtn color="primary" onClick={e => this.addItem(e)} href="/admin/add" >
                        Add Item
                      </MDBBtn>

                    <MDBContainer>
                        <MDBDataTable
                            striped
                            bordered
                            hover
                            data={this.state.data}
                        />
                    </MDBContainer>
                </MDBContainer>
            </header>
        );

    }
}

export default AdminView;