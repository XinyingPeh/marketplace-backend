require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const paymentControllers = {
  createIntent: async (req, res) => {
    try {
      // create a PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "sgd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      // Return the secret
      res.json({ paymentIntent: paymentIntent.client_secret });
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  },
};

module.exports = paymentControllers;

// const Payment = require("../models/PaymentModel");
// const Cart = require("../models/CartModel");

// const paymentController = {
//   createPayment: async (req, res) => {
//     const cartID = req.params.cartID;
//     const { amount } = req.body;

//     try {
//       // Check if the cart exists
//       const cart = await Cart.findById(cartID);
//       if (!cart) {
//         res.statusCode = 404;
//         return res.json({ error: "Cart not found" });
//       }

//       // Create a new payment object
//       const payment = new Payment({
//         cart: cartID,
//         amount: amount,
//       });

//       // Save the payment object
//       await payment.save();

//       // Update the cart with the payment reference
//       cart.payment = payment._id;
//       await cart.save();

//       res.json({ message: "Payment created successfully", payment: payment });
//     } catch (err) {
//       res.statusCode = 500;
//       return res.json({ error: "Internal server error" });
//     }
//   },

//   // Other payment controller methods...
// };

// module.exports = paymentController;
