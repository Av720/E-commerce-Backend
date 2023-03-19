const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ProductTag extends Model {}

ProductTag.init(
  {
    //this will define id clumn
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // this will define the product_id column
    product_id: {
      type: DataTypes.INTEGER,

      references: {
        model: "product",
        key: "id",
      },
    },
    // this will define the models id
    tag_id: {
      type: DataTypes.INTEGER,

      references: {
        model: "tag",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

module.exports = ProductTag;
