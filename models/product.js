'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.ProductCategory, {foreignKey: 'category_id'})
      Product.hasMany(models.Review, { foreignkey: 'product_id' })
      Product.hasMany(models.Order, {foreignKey: 'product_id'})
    }
  };
  Product.init({
    title: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    stock: DataTypes.INTEGER,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};