const express = require('express');

const sequelize = require("./config/db");

const productRoutes = require("./routes/product.routes");

const app = express();

app.use(express.json());

app.use(productRoutes);

sequelize.sync().then(()=>{console.log("Mysql Connected")})

app.listen(5000,()=>{
    console.log("Server running on port 5000");
})

