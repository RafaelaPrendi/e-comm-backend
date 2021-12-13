const express = require("express");
const env = require("dotenv");
const bodyparser = require("body-parser");
const connectToDb = require("./db");

//environment variables
env.config();

// mongodb connection
connectToDb();

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyparser.json());

app.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}`);
});
//routes
const authRoutes = require("./routes/auth/auth.route");
const adminAuthRoutes = require("./routes/auth/admin/auth.route");
app.use("/api", adminAuthRoutes);
app.use("/api", authRoutes);
app.get("/hello", (req, res) => {
  res.status(200).json({
    message: "Hello from backend server!",
  });
});
