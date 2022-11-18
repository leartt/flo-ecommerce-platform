const router = require("express").Router();

const stripe = require("stripe")(
  "sk_test_51LUVbNDObiAQiZmNMmyuQV9AhoG9Dl96jatcPOE9DLZPLvUITVTfQBN08B6aDamWnUI7MGHWyP3i2PDfU9GK0kwI00HQ5bzoDi"
);

const checkAuth = require("../../middlewares/check-auth.middleware");

const ApplicationError = require("../../utils/ApplicationError");

router.post("/payment_intent/create", checkAuth, async (req, res, next) => {
  try {
    console.log(req.body);
    const { amount, subtotal, discount } = req.body;
    console.log(discount);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount),
      metadata: { ...discount, subtotal },
      currency: "eur",
    });

    console.log(paymentIntent);

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/payment_intent/retrieve", checkAuth, async (req, res, next) => {
  try {
    const { paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return res.status(201).json({ paymentIntent });
  } catch (error) {
    next(error);
  }
});

router.post("/payment_intent/update/:id", checkAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newAmount, newSubtotal, discount } = req.body;

    const paymentIntent = await stripe.paymentIntents.update(id, {
      amount: newAmount,
      metadata: discount
        ? {
            code: discount.code,
            percentage: discount.percentage,
            value: discount.value,
            subtotal: newSubtotal,
          }
        : {
            code: "",
            percentage: "",
            value: "",
            subtotal: newSubtotal,
          },
    });

    res.status(200).json({
      paymentIntent,
      amount: paymentIntent.amount,
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/payment_intent/retrieve/:id",
  checkAuth,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const paymentIntent = await stripe.paymentIntents.retrieve(id);

      if (paymentIntent.status === "succeeded") {
        throw new ApplicationError(
          400,
          "You can not use this payment intent beacuse it has already succeeded"
        );
      }

      res.status(200).json({
        paymentIntent,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
