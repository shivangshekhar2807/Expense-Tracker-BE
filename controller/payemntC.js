const { validateWebhookSignature } = require("razorpay/dist/utils/razorpay-utils");
const { orderPaymentModel, userModel } = require("../models");
const instance = require("../utils/razorpay");

const addpayment = async(req, res) =>{
    try {
         const { amount,type } = req.body;
        const { name, email, phone, id } = req.user;
        
        const paymentOrder = await instance.orders.create({
          amount: amount * 100,
          currency: "INR",

          notes: {
            name,
            email,
            phone,
            type
          },
        });

        const finalOrder = await orderPaymentModel.create({
          orderId: paymentOrder.id,
          paymentId: null, // Will be updated after payment success
          amount: paymentOrder.amount / 100, // store in rupees
          amount_paid: paymentOrder.amount_paid / 100,
          attempts: paymentOrder.attempts,
          created_at: paymentOrder.created_at,
          currency: paymentOrder.currency,
          status: paymentOrder.status,
          notes: paymentOrder.notes,
          type,
          UserId: id,
        });

        console.log(paymentOrder);
        
       res.status(201).json({
         message: "Order created and stored successfully",
         data: paymentOrder.id,
         keyId: process.env.RAZORPAY_KEY_ID,
           name: name,
           phone: phone,
           email:email,
       });

    }
    catch (err) {
        res.status(500).json({
            ERROR:err.message
        })
    }
}


const getWebhook = async (req, res) => {
    try {
         const webhookSignature = req.get("X-Razorpay-Signature");
        console.log("webhookSignature", webhookSignature);
        
        const isWebhookValid = validateWebhookSignature(
          JSON.stringify(req.body),
          webhookSignature,
          process.env.RAZORPAY_WEBHOOK_SECRET
        );
        console.log("isWebhookValid", isWebhookValid);

         if (!isWebhookValid) {
           return res
             .status(400)
             .json({ ERROR: "Webhook signature is invalid" });
         }
        
        const paymentDetails = req.body.payload.payment.entity;

        const payment = await orderPaymentModel.findOne({
          where: {
            orderId: paymentDetails.order_id,
          },
        });

        payment.status = paymentDetails.status;
        
        await payment.save();

        console.log("payment", payment);

        const user = await userModel.findByPk(payment.UserId)
        
        if (!user) {
          return res.status(404).json({ ERROR: "User not found" });
        }
       
        const type = payment.type;

        const amount = paymentDetails.amount / 100;

        console.log("paymentDetails.notes.type", paymentDetails.notes.type);

        if (paymentDetails.status == "captured" && paymentDetails.notes.type == "Premium") {
             console.log(
               "paymentDetails.notes.type",
               paymentDetails.notes.type
             );
            user.Premium = true;
            await user.save();
        }
        else if (paymentDetails.status == "captured" && paymentDetails.notes.type == "Recharge") {
             console.log(
               "paymentDetails.notes.type",
               paymentDetails.notes.type
             );
            user.Wallet_Balance += amount;
            await user.save();
        }
        

     return res.status(200).json({ message: "Webhooh recieved successfully" });
        
    }
    catch (err) {
        return res.status(400).json({ ERROR: err.message });
    }
}

module.exports = { addpayment, getWebhook };