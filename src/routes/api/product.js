const router = require("express").Router();
const ProductController = require("../../controllers/product.controller");

const checkAuth = require("../../middlewares/check-auth.middleware");

router.get("/", checkAuth, ProductController.handleFindProducts);
router.get("/:id", ProductController.handleFindProductById);
router.post("/", ProductController.handleAddProduct);
router.delete("/:id", ProductController.handleDeleteProductById);

module.exports = router;
