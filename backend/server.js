require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");

const authRouter = require("./routers/authRouter");
const refreshRouter = require("./routers/refreshTokenRouter");
const logoutRouter = require("./routers/logoutRouter");
const organizationRouter = require("./routers/organizationRouter");

const verifyJWT = require("./middlewares/verifyJWT");

const cookieParser = require("cookie-parser");
const credentials = require("./middlewares/credentials");

const uri = process.env.MONGODB_URI;
let app = express();

//middlewares:

//Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
//middlewares in use function are added top to bottom (waterfall effect)
app.use(credentials);

app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false, limit: "5mb" }));

// parse application/json
app.use(express.json({ limit: "5mb" }));

//middleware for cookies
app.use(cookieParser());

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to MongoDB");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/refresh", refreshRouter);
app.use("/api/v1/logout", logoutRouter);

//From this point on, all routes will be protected by the "verifyJWT" middleware
app.use(verifyJWT);
app.use("/api/v1/organizations", organizationRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Altok Server listening on port ${PORT}`);
});
