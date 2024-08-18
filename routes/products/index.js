const router = require("express").Router();
const product = require("../../controllers/products/products.controller");


router.post("/create", product.createProduct);
router.get("/", product.getAllProduct);
router.delete("/:id", product.deleteProduct);
router.patch("/:id", product.updateProduct);


module.exports = router;
