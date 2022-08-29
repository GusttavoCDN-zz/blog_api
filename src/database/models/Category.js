/* eslint-disable max-lines-per-function */
/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes } DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { tableName: 'Categories', timestamps: false },
  );

  return Category;
};
