const router = require("express").Router();
const user = require("./users");
const task = require("./tasks");
const product = require("./products");


router.use("/user", user);
router.use("/task", task);
router.use("/product", product);


module.exports = router;
