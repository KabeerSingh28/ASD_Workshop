const express = require("express");
const productController = require("../controllers/productController");
const cacheMiddleware = require("../middleware/cacheMiddleware");

const router = express.Router();

router.use(cacheMiddleware);

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
