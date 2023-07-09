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
