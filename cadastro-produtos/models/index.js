const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },

  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  quantidade: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

const Categoria = sequelize.define('Categoria', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

Categoria.hasMany(Produto, {
  as: 'produtos',
  foreignKey: {
    name: 'categoriaId',
    allowNull: true
  }
});

Produto.belongsTo(Categoria, {
  as: 'categoria',
  foreignKey: {
    name: 'categoriaId',
    allowNull: true
  }
});

module.exports = {
  sequelize,
  Produto,
  Categoria
};