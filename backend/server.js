const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const biddingRoute = require("./routes/biddingRoute");
const categoryRoute = require("./routes/categoryRoute");
const errorHandler = require("./middleware/errorMiddleWare");
const passport = require("passport")
const cookieSession = require("cookie-session")
const app = express();
const passportSetup = require("../backend/passport")
const authRoute = require("../backend/routes/auth")

app.use(express.json());
app.use(cookieParser());

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(bodyParser.json());

app.use(
    cookieSession({
        name: "session",
        keys: ["cyberwolve"],
        maxAge: 24 * 60 * 60 * 100,
    })
)

app.use(passport.initialize());
app.use(passport.session())

app.use(
    cors({
        origin: ["http://localhost:3001"],
        methods: "GET , POST ,PUT , DELETE , PATCH",
        credentials: true,
    })
); 

app.use("/auth" , authRoute)

const PORT = process.env.PORT || 5000;
app.use("/api/users", userRoute);
app.use("/api/product", productRoute);
app.use("/api/bidding", biddingRoute);
app.use("/api/category", categoryRoute);

app.use(errorHandler);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
    res.send("Home Pages");
});
mongoose
    .connect(process.env.DATABASE_CLOUD)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });