const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", upload.single('gambar'),productController.createProduct);
router.put("/:id", upload.single('gambar'), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
