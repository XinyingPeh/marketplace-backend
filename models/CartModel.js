// const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema({
//   items: [{ type: mongoose.Schema.Types.ObjectId, ref: "ItemModel" }],
// });

// const Cart = mongoose.model("Cart", cartSchema);

// module.exports = Cart;

// const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema({
//   items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
// });

// const Cart = mongoose.model("Cart", cartSchema);

// module.exports = Cart;

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
