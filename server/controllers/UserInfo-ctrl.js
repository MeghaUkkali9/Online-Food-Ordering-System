const UserInfo = require("../model/user-model");
const UserSessionSchema = require("../model/UserSession");
const DishItemModel = require("../model/dish-item-model");
const CartModel = require("../model/cart-model");
const TransactionModel = require("../model/transaction-model");
const bcrypt = require("bcryptjs");

createUserInfo = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide User Information"
    });
  }

  const userinfo = new UserInfo(body);

  if (!userinfo) {
    return res.status(400).json({ success: false, error: err });
  }

  UserInfo.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.status(201).json({
        success: false,
        message: "Email already exist"
      });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userinfo.password, salt, (err, hash) => {
          if (err) throw err;
          userinfo.password = hash;
          userinfo
            .save()
            .then(user => {
              return res.status(201).json({
                success: true,
                id: userinfo._id,
                message: "UserInfo created!"
              });
            })
            .catch(error => {
              return res.status(400).json({
                error,
                message: "UserInfo not created!"
              });
            });
        });
      });
    }
  });
};

LoginCredential = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update"
    });
  }
  // console.log("login");
  const userSessionSchema = new UserSessionSchema();
  UserInfo.findOne({ email: req.body.email })
    .then(user => {
      console.log("user found");
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, response) => {
          if (err) {
            console.error(err);
            console.log("error found");
            res.status(201).json({
              success: false,
              message: "Credentials didn't match"
            });
          }
          if (response) {
            userSessionSchema.userId = user._id;
            userSessionSchema.save((err, doc) => {
              if (err) {
                console.log(err);
                res.status(204).json({
                  success: false,
                  message: "Error: server error"
                });
              }
              console.log("save");
              res.status(200).json({
                success: true,
                message: "User Credentials are matched!",
                token: doc._id,
                user: user.Fname,
                email: user.email
              });
            });
          } else {
            console.log("User not found");
            return res.status(201).json({
              success: false,
              message: "User not found!"
            });
          }
        });
      }else{
        res.status(201).json({
          success: false,
          message: "User email not found"
        });
      }
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: "User not found error!"
      });
    });
};

Logout = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update"
    });
  }
  UserSessionSchema.deleteOne({ _id: req.body.user_token })
    .then(user => {
      if (user) {
        console.log("User session found");
        res.status(200).json({
          success: true,
          message: "User sessiondeleted!"
        });
      } else {
        console.log("User not found");
        return res.status(201).json({
          success: false,
          message: "User not found!"
        });
      }
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: "User not found error!"
      });
    });
};

ResetPassword = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update"
    });
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) throw err;
      UserInfo.findOneAndUpdate({ email: req.body.email }, { password: hash })
        .then(user => {
          if (user) {
            console.log("User found");
            return res.status(200).json({
              success: true,
              message: "User found!"
            });
          } else {
            console.log("User not found");
            return res.status(201).json({
              success: false,
              message: "The given email is not found!"
            });
          }
        })
        .catch(error => {
          return res.status(400).json({
            error,
            message: "User not found error!"
          });
        });
    });
  });
};

AddItem = (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide Item Information"
    });
  }

  const dishItemModel = new DishItemModel(body);

  if (!dishItemModel) {
    return res.status(400).json({ success: false, error: err });
  }

  DishItemModel.findOne({ Dishname: req.body.Dishname }).then(dish => {
    if (dish) {
      res.status(201).json({
        success: false,
        message: "Dish name already exist"
      });
    } else {
      dishItemModel
        .save()
        .then(dish => {
          return res.status(201).json({
            success: true,
            id: dishItemModel._id,
            message: "Dish item is added!",
            dish_name: dish.Dishname,
            category: dish.Category,
            price: dish.Price
          });
        })
        .catch(error => {
          return res.status(400).json({
            error,
            message: "caught arror, Item not inserted!"
          });
        });
    }
  });
};

UpdateItem = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide User Information"
    });
  }

  const dishmodel = new DishItemModel(body);

  if (!dishmodel) {
    return res.status(400).json({ success: false, error: err });
  }

  DishItemModel.findOneAndUpdate( { _id: req.body.Id},
    { $set: { Dishname: req.body.Dishname, Price: req.body.Price} },
    {"multi": true}).then(dish => {
      if(dish){
     console.log('Updated', dish)
      return res.status(201).json({
        success: true,
        id: dish._id,
        message: "Updated successfully!"
      });
    }else{
        res.status(201).json({
          success: false,
          message: "Item is not updated"
        });
    }
    })
    .catch(error => {
      return res.status(400).json({
        error,
        success: false,
        message: "Caught error, Item is not updated"
      });
    });
}

GetDishItem = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide Item Information"
    });
  }

  DishItemModel.find({}, function (err, dishes) {
    var dishItemMap = [];
    let count = 0;
    if (dishes) {
      dishes.forEach(function (dish) {
        dishItemMap.push(dish);
        count++;
        console.log(dish);
      });
      return res.status(201).json({
        success: true,
        message: "Item retrieved!",
        dishItemMap: dishItemMap
      });
    }
    if (err) {
      return res.status(400).json({
        success: false,
        error: "You must provide Item Information"
      });
    }
  });
};

UploadImage = (req, res) => {
  const body = req.body;
  //console.log(req.body.data);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide Item Information"
    });
  }
  if (req.file)
    res.json({
      imageUrl: `${req.file.filename}`
    });
  else
    res.status("409").json("No Files to Upload.");


};

GetAppetizerItem = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide Item Information"
    });
  }

  DishItemModel.find({ Category: req.body.category }, function (err, dishes) {
    var dishItemMap = [];
    let count = 0;
    if (dishes) {
      dishes.forEach(function (dish) {
        dishItemMap.push(dish);
        count++;
        console.log(dish);
      });
      return res.status(201).json({
        success: true,
        message: "Item retrieved!",
        dishItemMap: dishItemMap
      });
    }
    if (err) {
      return res.status(400).json({
        success: false,
        error: "You must provide Item Information"
      });
    }
  });
};

GetMealItem = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide Item Information"
    });
  }

  DishItemModel.find({ Category: req.body.category }, function (err, dishes) {
    var dishItemMap = [];
    let count = 0;
    if (dishes) {
      dishes.forEach(function (dish) {
        dishItemMap.push(dish);
        count++;
        console.log(dish);
      });
      return res.status(201).json({
        success: true,
        message: "Item retrieved!",
        dishItemMap: dishItemMap
      });
    }
    if (err) {
      return res.status(400).json({
        success: false,
        error: "You must provide Item Information"
      });
    }
  });
};

GetDessertItem = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide Item Information"
    });
  }

  DishItemModel.find({ Category: req.body.category }, function (err, dishes) {
    var dishItemMap = [];
    let count = 0;
    if (dishes) {
      dishes.forEach(function (dish) {
        dishItemMap.push(dish);
        count++;
        console.log(dish);
      });
      return res.status(201).json({
        success: true,
        message: "Item retrieved!",
        dishItemMap: dishItemMap
      });
    }
    if (err) {
      return res.status(400).json({
        success: false,
        error: "You must provide Item Information"
      });
    }
  });
};

GetDrinkItem = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide Item Information"
    });
  }

  DishItemModel.find({ Category: req.body.category }, function (err, dishes) {
    var dishItemMap = [];
    let count = 0;
    if (dishes) {
      dishes.forEach(function (dish) {
        dishItemMap.push(dish);
        count++;
        console.log(dish);
      });
      return res.status(201).json({
        success: true,
        message: "Item retrieved!",
        dishItemMap: dishItemMap
      });
    }
    if (err) {
      return res.status(400).json({
        success: false,
        error: "You must provide Item Information"
      });
    }
  });
};


AddToCart = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide User Information"
    });
  }

  const cartModel = new CartModel(body);

  if (!cartModel) {
    return res.status(400).json({ success: false, error: err });
  }
  CartModel.findOneAndUpdate({ email: req.body.email, Dishname: req.body.Dishname, Category: req.body.Category, Price: req.body.Price },
    { $inc: { Quantity: 1 } }, { new: true, upsert: true }).then(cart => {
      return res.status(201).json({
        success: true,
        id: cart._id,
        message: "Cart created!"
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: "Cart not created!"
      });
    });

};

GetCartData = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide cart Information"
    });
  }

  const cartModel = new CartModel(body);
  CartModel.find({ email: req.body.email }, function (err, cartItems) {

    var cartItemMap = [];
    let count = 0;
    if (cartItems) {
      cartItems.forEach(function (cart) {
        cartItemMap.push(cart);
        count++;
        console.log(cart);
      });

      return res.status(201).json({
        success: true,
        message: "Item retrieved!",
        cartItemMap: cartItemMap
      });
    }
    console.log("cart:", cartItemMap);
    if (err) {
      return res.status(400).json({
        success: false,
        error: "You must provide Item Information"
      });
    }
  });
};

DeleteCartData = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide User Information"
    });
  }

  const cartModel = new CartModel(body);

  if (!cartModel) {
    return res.status(400).json({ success: false, error: err });
  }

  CartModel.findOneAndUpdate({ email: req.body.email, Dishname: req.body.Dishname },
    { $inc: { Quantity: -1 } }, { new: true, upsert: true }).then(cart => {
      if(cart.Quantity === 0){
        CartModel.deleteOne({ Quantity: 0 }).then(cartItemdelete => {
          if (cartItemdelete) {
            res.status(200).json({
              success: true,
              message: "Deleted"
            });
          } else {
            console.log("cartItemdelete not found");
            return res.status(201).json({
              success: false,
              message: "cartItemdelete not found!"
            });
          }
        })
          .catch(error => {
            return res.status(400).json({
              error,
              message: "cartItemdelete not found error!"
            });
          });
      }
      res.status(201).json({
        success: true,
        id: cart._id,
        message: "Cart created!"
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: "Cart not created!"
      });
    });

  

};

CheckOut = (req,res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide cart Information"
    });
  }


  CartModel.find({ email: req.body.email }, function (err, cartItems) {
    
    if (cartItems) {
      cartItems.forEach(function (cart) {
        console.log("tracns: ", cart);
        const transData = {
          Quantity: cart.Quantity,
          timestamp: Date.now(),
          Category: cart.Category,
          Dishname: cart.Dishname,
          Price: cart.Price,
          email: cart.email,
          rating: req.body.rating
        };
         const transaction = new TransactionModel(transData);
         transaction.save((saveErr, transaction) => {
          if (saveErr) {
            console.log(saveErr);
            res.status(204).json({
              success: false,
              message: "Error: server error"
            });
          } else {

            CartModel.deleteMany({ email: req.body.email }).then(cartItemdelete => {
              if (cartItemdelete) {
                res.status(200).json({
                  success: true,
                  message: "Deleted"
                });
              } 
            });
            console.log("save", transaction);
          }
          
        });
      });

      return res.status(201).json({
        success: true,
        message: "Item retrieved!",
      });
    }

    if (err) {
      return res.status(400).json({
        success: false,
        error: "You must provide Item Information"
      });
    }
  });
}

DeleteAdminData = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide Item Information"
    });
  }

  CartModel.deleteMany({ email: req.body.email }).then(cartItemdelete => {
    if (cartItemdelete) {
      res.status(200).json({
        success: true,
        message: "Deleted"
      });
    } 
  });
  DishItemModel.deleteOne({ Dishname:req.body.Dishname, Category: req.body.Category }, function (err, dishes) {
    if (dishes) {
      return res.status(201).json({
        success: true,
        message: "Dish Item is deleted!"
       
      });
    }
    if (err) {
      return res.status(400).json({
        success: false,
        error: "You must provide Item Information"
      });
    }
  });
}
module.exports = {
  createUserInfo,
  LoginCredential,
  Logout,
  ResetPassword,
  AddItem,
  UpdateItem,
  UploadImage,
  GetDishItem,
  GetAppetizerItem,
  GetMealItem,
  GetDessertItem,
  GetDrinkItem,
  AddToCart,
  GetCartData,
  DeleteCartData,
  CheckOut,
  DeleteAdminData
};
