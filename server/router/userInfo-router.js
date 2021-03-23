const express = require("express");

const UserInfoCtrl = require("../controllers/UserInfo-ctrl");

const router = express.Router();

router.post("/signup", UserInfoCtrl.createUserInfo);
router.post("/loginInfo", UserInfoCtrl.LoginCredential);
router.post("/logout", UserInfoCtrl.Logout);
router.post("/resetPassword", UserInfoCtrl.ResetPassword);
router.post("/addItem", UserInfoCtrl.AddItem);
router.post("/getDishItem", UserInfoCtrl.GetDishItem);
router.post("/getAppetizerItem", UserInfoCtrl.GetAppetizerItem);
router.post("/getMealItem", UserInfoCtrl.GetMealItem);
router.post("/getDessertItem", UserInfoCtrl.GetDessertItem);
router.post("/getDrinkItem", UserInfoCtrl.GetDrinkItem);
router.post("/addToCart", UserInfoCtrl.AddToCart);
router.post("/getCartData", UserInfoCtrl.GetCartData);
router.post("/deleteCartData", UserInfoCtrl.DeleteCartData);
router.post("/checkOut", UserInfoCtrl.CheckOut);
router.post("/deleteAdminData", UserInfoCtrl.DeleteAdminData);
router.post("/updateItem", UserInfoCtrl.UpdateItem);
module.exports = router;
