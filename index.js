const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// IMPORTANTE PONERLO ARRIBA DE LAS RUTAS
dotenv.config();
// RUTAS
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");
const productRoutes = require("./routes/products");
const stripeRoutes = require("./routes/stripe");

// conectamos con la url que nos dieron, cambiar contrase;a y nombre del proyecto de la url defecto
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("db connection success");
  })
  .catch((err) => {
    console.log(err);
  });

//permite que la aplicacion reciba post requests
app.use(cors());
app.use(express.json());
// armamos un enrutado a /api/users/[userRoutes]
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stripe", stripeRoutes);

// ES NECESARIO EL PUERTO
app.listen(process.env.PORT || 5000);
