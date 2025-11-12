const { Cashfree, CFEnvironment } = require("cashfree-pg");

// Initialize Cashfree in Sandbox mode
const cashfree = new Cashfree({
  environment: CFEnvironment.SANDBOX,
  appId: "TEST430329ae80e0f32e41a393d78b923034",
  secretKey: "TESTaf195616268bd6202eeb3bf8dc458956e7192a85",
});

const request = {
  order_amount: 1.0,
  order_currency: "INR",
  order_id: "devstudio_" + Date.now(), // generate unique order id
  customer_details: {
    customer_id: "devstudio_user",
    customer_phone: "9876543210",
  },
  order_meta: {
    return_url:
      "https://www.cashfree.com/devstudio/preview/pg/web/checkout?order_id={order_id}",
  },
};

// Create order
cashfree
  .PGCreateOrder(request)
  .then((response) => {
    console.log("✅ Order created successfully:");
    console.log(response.data);
  })
  .catch((error) => {
    console.error("❌ Error creating order:");
    console.error(error.response?.data || error.message);
  });
