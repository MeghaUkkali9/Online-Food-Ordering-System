import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../css/login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import {
  SignUp,
  HomePage,
  Logout,
  ForgotPassword,
  Login,
  AddDishItem,
  UpdateDishItem,
  AdminView,
  UserView,
  UserViewApetizer,
  UserViewMeal,
  UserViewDessert,
  UserCart,
  UserViewDrinks
} from "../pages";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />

        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/user/forgotPassword" exact component={ForgotPassword} />
        
        <Route path="/user/view" exact component={UserView} />
        <Route path="/user/view/apetizer" exact component={UserViewApetizer} />
        <Route path="/user/view/meal" exact component={UserViewMeal} />
        <Route path="/user/view/dessert" exact component={UserViewDessert} />
        <Route path="/user/view/drinks" exact component={UserViewDrinks} />
        <Route path="/user/logout" exact component={Logout} />

        <Route path="/admin/view" exact component={AdminView} />
        <Route path="/admin/add" exact component={AddDishItem} />
        <Route path="/admin/update" exact component={UpdateDishItem} />
        <Route path="/user/view/cart" exact component={UserCart} />
      </Switch>
    </Router>
  );
}

export default App;
