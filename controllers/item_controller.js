// const itemModel = require("../models/ItemModel");
// const Cart = require("../models/CartModel");

// const controllers = {
//   listItems: async (req, res) => {
//     // res.send("This is list!");
//     const items = await itemModel.find();
//     res.json(items);
//   },

//   getItem: async (req, res) => {
//     // res.send("This is item!");
//     const itemID = req.params.itemID;
//     let item = null;
//     try {
//       // use model to find by id
//       item = await itemModel.findById(itemID);
//     } catch (err) {
//       // if any error -> return response 500
//       res.statusCode = 500;
//       return res.json();
//     }

//     // if not exists -> return response 404
//     if (!item) {
//       console.log("does not exist");
//       res.statusCode = 404;
//       return res.json();
//     }
//     // console.log("get item success");
//     // return json response of the fetched data
//     return res.json(item);
//   },

//   // addToCart: async (req, res) => {
//   //   const itemID = req.params.itemID;

//   //   // Find the item by ID
//   //   let item = null;
//   //   try {
//   //     item = await itemModel.findById(itemID);
//   //   } catch (err) {
//   //     res.statusCode = 500;
//   //     return res.json();
//   //   }

//   //   if (!item) {
//   //     console.log("does not exist");
//   //     res.statusCode = 404;
//   //     return res.json();
//   //   }

//   //   // Create a new cart or find an existing cart for the session/user
//   //   let cart;
//   //   if (req.session.cartID) {
//   //     // If the cart ID is stored in the session, find the existing cart
//   //     try {
//   //       cart = await Cart.findById(req.session.cartID).populate("items");
//   //     } catch (err) {
//   //       res.statusCode = 500;
//   //       return res.json();
//   //     }
//   //   }

//   //   if (!cart) {
//   //     // If the cart doesn't exist, create a new cart
//   //     cart = new Cart({
//   //       items: [],
//   //     });
//   //   }

//   //   // Add the item to the cart
//   //   cart.items.push(item);
//   //   try {
//   //     await cart.save();
//   //   } catch (err) {
//   //     res.statusCode = 500;
//   //     return res.json();
//   //   }

//   //   // Store the cart ID in the session
//   //   req.session.cartID = cart._id;
//   //   // verify value of cartID
//   //   console.log("Cart ID:", req.session.cartID);

//   //   res.json({ message: "Item added to cart" });
//   // },

//   // addToCart: async (req, res) => {
//   //   const itemID = req.params.itemID;

//   //   // Find the item by ID
//   //   let item = null;
//   //   try {
//   //     item = await itemModel.findById(itemID);
//   //   } catch (err) {
//   //     res.statusCode = 500;
//   //     return res.json();
//   //   }

//   //   if (!item) {
//   //     console.log("does not exist");
//   //     res.statusCode = 404;
//   //     return res.json();
//   //   }

//   //   // Create a new cart or find an existing cart for the session/user
//   //   let cart;
//   //   if (req.session.cartID) {
//   //     // If the cart ID is stored in the session, find the existing cart
//   //     try {
//   //       cart = await Cart.findById(req.session.cartID).populate("items");
//   //     } catch (err) {
//   //       res.statusCode = 500;
//   //       return res.json();
//   //     }
//   //   }

//   //   if (!cart) {
//   //     // If the cart doesn't exist, create a new cart
//   //     cart = new Cart({
//   //       items: [],
//   //     });

//   //     try {
//   //       await cart.save(); // Save the new cart
//   //       req.session.cartID = cart._id; // Store the cart ID in the session
//   //     } catch (err) {
//   //       res.statusCode = 500;
//   //       return res.json();
//   //     }
//   //   }

//   //   // Add the item to the cart
//   //   cart.items.push(item);
//   //   try {
//   //     await cart.save();
//   //   } catch (err) {
//   //     res.statusCode = 500;
//   //     return res.json();
//   //   }

//   //   // Store the cart ID in the session (in case it was not previously stored)
//   //   req.session.cartID = cart._id;
//   //   // Verify the value of cartID
//   //   console.log("Cart ID:", req.session.cartID);

//   //   res.json({ message: "Item added to cart" });
//   // },

//   // viewCart: async (req, res) => {
//   //   // console.log("i want to see what is in my cart");
//   //   // res.send("This is the cart!");

//   //   let cart;
//   //   if (req.session.cartID) {
//   //     console.log("Cart ID:", req.session.cartID);

//   //     try {
//   //       cart = await Cart.findById(req.session.cartID).populate("items");
//   //     } catch (err) {
//   //       res.statusCode = 500;
//   //       return res.json();
//   //     }
//   //   }

//   //   if (!cart || cart.items.length === 0) {
//   //     return res.json({ message: "Cart is empty" });
//   //   }

//   //   return res.json(cart.items);
//   // },
// };

// module.exports = controllers;

const itemModel = require("../models/ItemModel");

const controllers = {
  listItems: async (req, res) => {
    try {
      const items = await itemModel.find();
      res.json(items);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  getItem: async (req, res) => {
    const itemID = req.params.itemID;
    try {
      const item = await itemModel.findById(itemID);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      return res.json(item);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = controllers;
