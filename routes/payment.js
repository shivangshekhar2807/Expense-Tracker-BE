const express = require("express");

const { Auth } = require("../middleware/auth");
const { addpayment, getWebhook, } = require("../controller/payemntC");

const paymentRouter = express.Router();

paymentRouter.post("/Razorpay/Payment/OrderId", Auth, addpayment);
paymentRouter.post("/payment/webhook",getWebhook);

module.exports = paymentRouter;
