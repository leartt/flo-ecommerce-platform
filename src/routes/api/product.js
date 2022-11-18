const router = require("express").Router();
const ProductController = require("../../controllers/product.controller");

const checkAuth = require("../../middlewares/check-auth.middleware");

router.get("/", ProductController.handleFindProducts);
router.get("/categories", ProductController.handleGetCategories);
router.get("/colors", ProductController.handleGetColors);
router.get("/:id", ProductController.handleFindProductById);
router.post("/ratings/:productId", ProductController.handleRateProduct);
router.post("/", ProductController.handleAddProduct);
router.put("/:id", checkAuth, ProductController.handleEditProduct);
router.delete("/:id", ProductController.handleDeleteProductById);

module.exports = router;
