const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item_controller");

router.get("/", itemController.listItems);
router.get("/:itemID", itemController.getItem);

module.exports = router;
