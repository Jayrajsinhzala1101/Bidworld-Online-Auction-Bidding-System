const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        // Redirect user after successful login
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3001";
        res.redirect(`${frontendUrl}/dashboard`);
    }
);

module.exports = router;
