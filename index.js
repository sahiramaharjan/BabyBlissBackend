const express = require("express");
require("dotenv").config();
const app = express();
const connectDB = require("./src/Config/db");
const productRoutes = require("./src/Routes/productRoutes")
const authRoutes = require("./src/Routes/authRoutes")
const profileRoutes= require("./src/Routes/profileRoutes")
const categoryRoutes = require("./src/Routes/categoryRoutes")
const orderRoutes = require("./src/Routes/orderRoutes")
const wishlistRoutes = require("./src/Routes/wishlistRoutes")
const cartRoutes = require("./src/Routes/cartRoutes")
app.use(express.json()); //form data(text) will convert into json
const cors = require("cors");
const port = process.env.port;
connectDB();
app.use(express.json());

app.use(cors((
  origin = "http://localhost:3000")
  , (credentials = true)
));

app.use('/api/auth', authRoutes)

app.use("/uploads", express.static(__dirname + "/uploads"))
app.use("/api/profile", profileRoutes)
app.use('/api/products',productRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/wishlist',wishlistRoutes)
app.use('/api/cart',cartRoutes)

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});