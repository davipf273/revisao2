const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Cliente = db.define('cliente',{
    codCliente:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cpf:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefone:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
},{
    tableName:'clientes',
    timestamps: false
})

module.exports = Cliente