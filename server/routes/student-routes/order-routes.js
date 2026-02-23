const express = require("express");
const {
  createOrder,
  capturePaymentAndFinalizeOrder,
  createDemoOrder,
} = require("../../controllers/student-controller/order-controller");

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePaymentAndFinalizeOrder);
router.post("/demo", createDemoOrder);

module.exports = router;
