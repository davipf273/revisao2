const Equipamento = require('../models/Equipamento')
const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'secredo'

const cadastrar = async(req,res)=>{
    const valores = req.body

    try{
        if(!valores.idCliente || !valores.modelo || !valores.fabricante || !valores.numeroSrr){
            return res.status(401).json({message: 'todos os campos são obricatorios'})
        }

        const numeroSrrCrypto = CryptoJS.AES.encrypt(valores.numeroSrr,CHAVE_SECRETA).toString()

        await Equipamento.create({
            idCliente: valores.idCliente,
            modelo: valores.modelo,
            fabricante: valores.fabricante,
            numeroSrr: numeroSrrCrypto,
        })

        return res.status(201).json({message: 'equipamento cadastrado com sucesso'})
    }catch(err){
        console.error('Erro ao cadastrar equipamento',err)
        return res.status(400).json({message: 'Erro ao cadastrar equipamento'})
    }
}

const atualizar = async(req,res)=>{
    const valores = req.body
    const id = req.params.id

    try{
        const equipamento = await Equipamento.findByPk(id)
        if(!equipamento){
            return res.status(404).json({message: 'equipamento não encontrado'})
        }

        if(!valores.idCliente || !valores.modelo || !valores.fabricante || !valores.numeroSrr){
            return res.status(401).json({message: 'todos os campos são obricatorios'})
        }


        if(!valores.numeroSrr){
            const numeroSRR = CryptoJS.AES.encrypt(valores.numeroSrr,CHAVE_SECRETA).toString()
            valores.numeroSrr = numeroSRR
        } 

        await Equipamento.update(valores,{where: {codEquipamento: id}})

        return res.status(201).json({message: 'equipamento atualizado com sucesso'})
    }catch(err){
        console.error('Erro ao atualizado equipamento',err)
        return res.status(400).json({message: 'Erro ao atualizar equipamento'})
    }
}

module.exports = { cadastrar, atualizar}