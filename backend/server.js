const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authCookies = require("./middleware/authCookies");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

// import Routes
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

// Middleware
app.use(cookieParser());
app.use(authCookies);
app.use(cors({
  origin: "http://localhost:5175", // ganti dengan asal frontend-mu
  credentials: true
}));

app.use(express.json());

// Serve static files dari folder /uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/products", productRoutes);
app.use("/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
