const router = require("express").Router();
const ProductController = require("../../controllers/product.controller");

router.get("/", ProductController.handleFindProducts);
router.get("/:id", ProductController.handleFindProductById);
router.post("/", ProductController.handleAddProduct);
router.delete("/:id", ProductController.handleDeleteProductById);

module.exports = router;
