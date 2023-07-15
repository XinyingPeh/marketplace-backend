require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Cart = require("../models/CartModel");

const paymentController = {
  checkout: async (req, res) => {
    const userID = res.locals.authUserID;

    try {
      // Find the cart for the user
      const cart = await Cart.findOne({ user: userID }).populate("items.item");
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // Create line items for the Stripe checkout session
      const lineItems = cart.items.map((cartItem) => {
        const item = cartItem.item;
        // console.log(item); // Log the item object to inspect its properties
        return {
          price_data: {
            currency: "sgd",
            product_data: {
              name: item.name,
              images: [item.image.trim()],
              description: item.description,
            },
            unit_amount: Math.round(item.price * 100), // Ensure a valid integer value
          },
          quantity: cartItem.quantity, // Use the quantity from the cart item
        };
      });

      // Calculate the cart total
      const cartTotal = cart.items.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.quantity;
      }, 0);

      // Check if cart total is a valid number
      if (isNaN(cartTotal)) {
        throw new Error("Invalid cart total");
      }

      // Create the Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/checkout-cancel`,
      });

      res.status(200).json({ session });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = paymentController;
