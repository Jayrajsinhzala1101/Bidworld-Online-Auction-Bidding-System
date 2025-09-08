const express = require("express");
const { registerUser , logiUser , loginStatus , logoutuser, loginAsSeller, getUser, getuserBalance, getAllUser, estimateIncome } = require("../controllers/userCtr");
const { protect, isAdmin } = require("../middleware/authMiddleWare");
const router = express.Router();

router.post("/register" , registerUser);
router.post("/login" , logiUser);
router.get("/loggedin" , loginStatus);
router.get("/logout" , logoutuser);
router.post("/seller" , loginAsSeller);
router.get("/getuser" , protect,  getUser);
router.get("/sell-amount" , protect,  getuserBalance);

router.get("/estimate-income" , protect, isAdmin, estimateIncome);

router.get("/users" , protect, isAdmin, getAllUser); //only access for admin users

module.exports = router;