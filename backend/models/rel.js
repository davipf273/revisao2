const Cliente = require('./Cliente')
const Funcionario = require('./Funcionario')
const Equipamento = require('./Equipamento')
const Inspecao = require('./Inspecao')


Cliente.hasMany(Equipamento,{
    foreignKey: 'idCliente',
    as: 'equipamentoCliente',
    onDelete: 'CASCADE'
})

Equipamento.belongsTo(Cliente,{
    foreignKey:'idCliente',
    as:'clienteEquipamento',
    allowNull: false
})

Inspecao.hasMany(Equipamento,{
    foreignKey: 'idEquip',
    as: 'equipamentoInspecao',
    onDelete: 'CASCADE'
})

Equipamento.belongsTo(Inspecao,{
    foreignKey:'idEquip',
    as:'inspecaoEquipamento',
    allowNull: false
})

module.exports = { Funcionario, Cliente, Equipamento, Inspecao}