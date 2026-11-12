const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Equipamento = db.define('equipamento',{
    codEquipamento:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCliente:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'clientes',
            key: 'codCliente',
        }
    },
    modelo:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fabricante:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    numeroSrr:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
},{
    tableName:'equipamentos',
    timestamps: false
})

module.exports = Equipamento