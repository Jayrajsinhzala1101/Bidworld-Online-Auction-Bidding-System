const express = require("express");
const { createProduct, getAllProducts, deleteProduct, updateProduct, getAllProductsOfUser, verifyAndAddCommisionInProductByAdmin, getAllProductsByAdmin, deleteProductByAdmin, getProduct, getAllSoldProducts, getWonProducts } = require("../controllers/productController");
const { protect, isSeller, isAdmin } = require("../middleware/authMiddleWare");
const { upload } = require("../utils/fileUpload");
const router = express.Router();

router.get("/", getAllProducts);
router.post("/", protect, isSeller, upload.single("image"), createProduct);
router.get("/sold", getAllSoldProducts);
router.get("/won-products", protect, getWonProducts);
router.get("/user", protect, getAllProductsOfUser);

router.get("/:id", getProduct);
router.put("/:id", protect, isSeller, upload.single("image"), updateProduct);

router.delete("/:id", protect, deleteProduct);
//only access for admin user
router.get("/admin/products", protect, isAdmin, getAllProductsByAdmin);
router.patch("/admin/product-verified/:id", protect, isAdmin, verifyAndAddCommisionInProductByAdmin);

router.delete("/admin/products", protect, isAdmin, deleteProductByAdmin);



module.exports = router;