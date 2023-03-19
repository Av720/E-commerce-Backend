// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // this will define the id column
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  {
    // this will define the product_name column
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product",
  },

  // this will define the price column..
  {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: true,
    },
  },
  {
    //this will define the category id

    type: DataTypes.INTEGER,
    references: {
      model: "category",
      key: "id",
    },
  },
  //this will define the stock column
  {
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    },
  }
);

module.exports = Product;
