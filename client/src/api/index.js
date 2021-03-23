import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api"
});

// login
export const LoginService = payload => api.post(`/loginInfo`, payload);
export const LogoutService = payload => api.post(`/logout`, payload);
// signup
export const SignupService = payload => api.post(`/signup`, payload);
// forgot password
export const ResetService = payload => api.post(`/resetPassword`, payload);
// admin
export const AddItem = payload => api.post(`/addItem`, payload);
export const AddItemQuery = payload => api.post(`/user/admin/addItemQuery`, payload);
export const UploadImage = payload => api.post(`/upload`, payload);
export const AdminViewService = payload => api.post(`/admin/view`, payload);
// user
export const UserViewService = payload => api.post(`/user/view`, payload);

export const GetDishItem = payload => api.post(`/getDishItem`, payload);
export const GetAppetizerItem = payload => api.post(`/getAppetizerItem`, payload);
export const GetMealItem = payload => api.post(`/getMealItem`, payload);
export const GetDessertItem = payload => api.post(`/getDessertItem`, payload);
export const GetDrinkItem = payload => api.post(`/getDrinkItem`, payload);
export const AddToCart = payload => api.post(`/addToCart`, payload);
export const GetCartData = payload => api.post('/getCartData', payload);
export const DeleteCartData = payload => api.post('/deleteCartData', payload);
export const CheckOut = payload => api.post('/checkOut', payload);
export const DeleteCart = payload => api.post('/deleteCart', payload);
export const DeleteAdminData = payload => api.post('/deleteAdminData', payload);
export const UpdateItem = payload => api.post('/updateItem', payload);

const apis = {
  SignupService,
  LoginService,
  UserViewService,
  LogoutService,
  ResetService,
  AddItem,
  UploadImage,
  AdminViewService,
  AddItemQuery,
  GetDishItem,
  GetAppetizerItem,
  GetMealItem,
  GetDessertItem,
  GetDrinkItem,
  AddToCart,
  GetCartData,
  DeleteCartData,
  CheckOut,
  DeleteCart,
  DeleteAdminData,
  UpdateItem
};

export default apis;
