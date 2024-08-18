const router = require("express").Router();
const product = require("../../controllers/products/products.controller");
const auth = require("../../middlewares/auth");
const { singleUpload } = require("../../middlewares/upload");


router.post("/create", singleUpload, product.createProduct);
router.get("/", product.getAllProduct);
router.delete("/:id", auth('admin'), product.deleteProduct);
router.patch("/:id", product.updateProduct);


module.exports = router;
