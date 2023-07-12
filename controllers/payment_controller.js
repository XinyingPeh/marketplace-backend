require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const paymentControllers = {
  checkout: async (req, res) => {
    // Get checkout items data
    const line_items = req.body.cartItems.map((item) => {
      return {
        price_data: {
          currency: "sgd",
          product_data: {
            name: item.name,
            image: item.image,
            description: item.desc,
            metadata: {
              id: item._id,
            },
          },
          unit_amount: 2000,
        },
        quantity: item.cartQuantity,
      };
    });
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      automatic_payment_methods: {
        enabled: true,
      },
      line_items,
      mode: "payment",
      success_url: "${process.env.CLIENT_URL}/checkout-success",
      cancel_url: "${process.env.CLIENT_URL}/checkout-cancel",
    });

    res.redirect(303, session.url);
  },
};

// try {
//   // create a PaymentIntent
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: req.body.amount,
//     currency: "sgd",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });
//   // Return the secret
//   res.json({ paymentIntent: paymentIntent.client_secret });
// } catch (e) {
//   res.status(400).json({
//     error: e.message,
//   });
// }
//   },
// };

module.exports = paymentControllers;
