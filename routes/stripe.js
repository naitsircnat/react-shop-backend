const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const orderServices = require("../services/orderServices");

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let event;
    try {
      let sig = req.headers["stripe-signature"];
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.error("Webhook error: ", error.message);
      return res.status(400).send(`Webhook error: ${error.message}`);
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        console.log("Checkout session completed!", session);
        if (session.metadata && session.metadata.orderId) {
          await orderServices.updateOrderStatus(
            session.metadata.orderId,
            "processing"
          );
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }
);
