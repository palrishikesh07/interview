const {DataTypes} = require('sequelize');
const sequelize = require('./../config/db');

const Product = sequelize.define('Product',{
    name:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.TEXT
    },
    price:{
        type:DataTypes.INTEGER
    }
});

module.exports = Product;
