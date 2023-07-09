// const express = require("express");
// const router = express.Router();
// const itemController = require("../controllers/item_controller");
// const cartRouter = require("./cart_router");

// // list all items in marketplace
// router.get("/", itemController.listItems);

// // // show all items in cart
// // router.get("/cart", itemController.viewCart);

// // show specific item in marketplace
// router.get("/:itemID", itemController.getItem);

// // // add specific item to cart
// // router.post("/:itemID/addToCart", itemController.addToCart);

// router.use("/cart", cartRouter);

// module.exports = router;

const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item_controller");
const cartController = require("../controllers/cart_controller");

// API endpoint routes for items

// list all items in marketplace
router.get("/", itemController.listItems);

// show specific item in marketplace
router.get("/:itemID", itemController.getItem);

// adding an item to the cart
router.post("/:itemID/addToCart", cartController.addToCart);

// viewing the cart
router.get("/cart/:cartID", cartController.viewCart);

// // removing an item from the cart
// router.delete("/cart/:cartID/:itemID", cartController.removeFromCart);

module.exports = router;
