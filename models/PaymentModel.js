const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  // Include other payment details as needed
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
