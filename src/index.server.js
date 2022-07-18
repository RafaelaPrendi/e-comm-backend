const express = require("express");
const env = require("dotenv");
const bodyparser = require("body-parser");
const connectToDb = require("./db");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//environment variables
env.config();

// mongodb connection
connectToDb();

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyparser.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4000",
  })
);

app.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}`);
});
//routes
const authRoutes = require("./routes/auth/authRoute");
const adminAuthRoutes = require("./routes/auth/admin/authRoute");
const categoryRoutes = require("./routes/category/category");
const productRoutes = require("./routes/product/product");
const cartRoutes = require("./routes/cart/cart");

app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api/admin", adminAuthRoutes);
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

app.get("/hello", (req, res) => {
  res.status(200).json({
    message: "Hello from backend server!",
  });
});
