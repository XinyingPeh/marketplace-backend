// const Cart = require("../models/CartModel");
// const Item = require("../models/ItemModel");

// const cartController = {
//   addToCart: async (req, res) => {
//     const itemID = req.params.itemID;

//     try {
//       const item = await Item.findById(itemID);
//       if (!item) {
//         return res.status(404).json({ message: "Item not found" });
//       }

//       let cart;
//       if (req.session.cartID) {
//         cart = await Cart.findById(req.session.cartID);
//       }

//       if (!cart) {
//         cart = new Cart({
//           items: [],
//         });
//       }

//       cart.items.push(item);
//       await cart.save();

//       req.session.cartID = cart._id;

//       return res.json({ message: "Item added to cart" });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   },

//   removeFromCart: async (req, res) => {
//     const itemID = req.params.itemID;

//     try {
//       const item = await Item.findById(itemID);
//       if (!item) {
//         return res.status(404).json({ message: "Item not found" });
//       }

//       if (!req.session.cartID) {
//         return res.status(404).json({ message: "Cart not found" });
//       }

//       const cart = await Cart.findById(req.session.cartID);
//       if (!cart) {
//         return res.status(404).json({ message: "Cart not found" });
//       }

//       // Find the index of the item in the cart
//       const itemIndex = cart.items.findIndex(
//         (cartItem) => cartItem.toString() === itemID
//       );

//       if (itemIndex === -1) {
//         return res.status(404).json({ message: "Item not found in cart" });
//       }

//       // Remove the item from the cart
//       cart.items.splice(itemIndex, 1);
//       await cart.save();

//       return res.json({ message: "Item removed from cart" });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   },
// };

// module.exports = cartController;

const Cart = require("../models/CartModel");
const Item = require("../models/ItemModel");

const cartController = {
  addToCart: async (req, res) => {
    const itemID = req.params.itemID;

    try {
      const item = await Item.findById(itemID);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      let cart;
      if (req.session.cartID) {
        console.log("Cart ID:", req.session.cartID);

        cart = await Cart.findById(req.session.cartID);
      }

      if (!cart) {
        cart = new Cart({
          items: [],
        });
      }

      cart.items.push(item);
      await cart.save();

      req.session.cartID = cart._id;

      return res.json({ message: "Item added to cart" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // removeFromCart: async (req, res) => {
  //   const itemID = req.params.itemID;

  //   try {
  //     const item = await Item.findById(itemID);
  //     if (!item) {
  //       return res.status(404).json({ message: "Item not found" });
  //     }

  //     if (!req.session.cartID) {
  //       return res.status(404).json({ message: "Cart not found" });
  //     }

  //     const cart = await Cart.findById(req.session.cartID);
  //     if (!cart) {
  //       return res.status(404).json({ message: "Cart not found" });
  //     }

  //     // Find the index of the item in the cart
  //     const itemIndex = cart.items.findIndex(
  //       (cartItem) => cartItem.toString() === itemID
  //     );

  //     if (itemIndex === -1) {
  //       return res.status(404).json({ message: "Item not found in cart" });
  //     }

  //     // Remove the item from the cart
  //     cart.items.splice(itemIndex, 1);
  //     await cart.save();

  //     return res.json({ message: "Item removed from cart" });
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(500).json({ message: "Internal server error" });
  //   }
  // },

  //   viewCart: async (req, res) => {
  //     try {
  //       if (!req.session.cartID) {
  //         return res.json({ message: "Cart is empty" });
  //       }

  //       const cart = await Cart.findById(req.session.cartID).populate("items");

  //       if (!cart || cart.items.length === 0) {
  //         return res.json({ message: "Cart is empty" });
  //       }

  //       return res.json(cart.items);
  //     } catch (err) {
  //       console.error(err);
  //       return res.status(500).json({ message: "Internal server error" });
  //     }
  //   },

  //   viewCart: async (req, res) => {
  //     try {
  //       console.log("Cart ID:", req.session.cartID);
  //       if (!req.session.cartID) {
  //         return res.json({ message: "Cart is empty" });
  //       }

  //       const cart = await Cart.findById(req.session.cartID).populate("items");

  //       if (!cart || cart.items.length === 0) {
  //         return res.json({ message: "Cart is empty" });
  //       }

  //       return res.json(cart.items);
  //     } catch (err) {
  //       console.error(err);
  //       return res.status(500).json({ message: "Internal server error" });
  //     }
  //   },

  viewCart: async (req, res) => {
    const cartID = req.params.cartID;
    try {
      const cart = await Cart.findById(cartID).populate("items");
      if (!cart || cart.items.length === 0) {
        return res.json({ message: "Cart is empty" });
      }
      return res.json(cart.items);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  removeFromCart: async (req, res) => {
    const { cartID, itemID } = req.params;

    try {
      // Find the cart by ID
      const cart = await Cart.findById(cartID);
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // Find the index of the item in the cart's items array
      const itemIndex = cart.items.findIndex(
        (itemId) => itemId.toString() === itemID
      );
      if (itemIndex === -1) {
        return res.status(404).json({ message: "Item not found in cart" });
      }

      // Remove the item from the cart
      cart.items.splice(itemIndex, 1);
      await cart.save();

      return res.json({ message: "Item removed from cart" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = cartController;
