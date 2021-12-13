'use strict';
const {
  Model
} = require('sequelize');

//for encrypting password
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order, { foreignKey: 'user_id' })
    }

    static #encrypt = (password) => bcrypt.hashSync(password, 10)

    static register = ({ username, password }) => {
      const encryptedPassword = this.#encrypt(password)
      return this.create({username, password: encryptedPassword, asAdmin: false})
    }

    checkPassword = (password) => bcrypt.compareSync(password, this.password)

    static authenticate = async({ username, password }) => {
      try {
        const user = await this.findOne({ where: { username } })
        if(!user) return Promise.reject('User not found!')
        const isPasswordValid = user.checkPassword(password)
        if(!isPasswordValid) return Promise.reject('Wrong password!')
        return Promise.resolve(user)
      }
      catch (error) {
        return Promise.reject(error)
      }
    }



  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    asAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};