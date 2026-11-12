const Cliente = require('../models/Cliente')
const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'secredo'

const cadastrar = async(req,res)=>{
    const valores = req.body

    try{
        if(!valores.nome || !valores.cpf || !valores.telefone){
            return res.status(401).json({message: 'todos os campos são obricatorios'})
        }

        if(!valores.cpf == 11){
            return res.status(401).json({message: 'é obrigatorio 11 digitos do cpf'})
        }

        const cpfCrypto = CryptoJS.AES.encrypt(valores.cpf,CHAVE_SECRETA).toString()

        await Cliente.create({
            nome: valores.nome,
            cpf: cpfCrypto,
            telefone: valores.telefone
        })

        return res.status(201).json({message: 'Cliente cadastrado com sucesso'})
    }catch(err){
        console.error('Erro ao cadastrar Cliente',err)
        return res.status(400).json({message: 'Erro ao cadastrar Cliente'})
    }
}

const consultarID = async(req,res)=>{
    const id = req.params.id
    
    try{
        const cliente = await Cliente.findByPk(id)
        if(!cliente){
            return res.status(404).json({message: 'cliente não encontrado'})
        }
        const bytes = CryptoJS.AES.decrypt(cliente.cpf, CHAVE_SECRETA)
        const cpfDesCrypto = bytes.toString(CryptoJS.enc.Utf8)

        const payload = {
            nome: cliente.nome,
            cpf: cpfDesCrypto,
            telefone: cliente.telefone
        }

        return res.status(200).json(payload)
    }catch(err){
        console.error('erro ao consultar cliente',err)
        return res.status(400).json({message: 'erro ao consultar cliente'})
    }
}

const apagar = async(req,res)=>{
    const id = req.params.id
    try{
        const cliente = await Cliente.findByPk(id)
        if(!cliente){
            return res.status(404).json({message: 'cliente não encontrado'})
        }
        
        await Cliente.destroy({where: {codCliente: id}})
        return res.status(200).json({message: 'cliente excluido com sucesso'})
    }catch(err){
        console.error('erro ao apagar cliente',err)
        return res.status(400).json({message: 'erro ao apagar cliente'})
    }
}

const atualizar = async(req,res)=>{
    const valores = req.body
    const id = req.params.id

    try{
        const cliente = await Cliente.findByPk(id)
        if(!cliente){
            return res.status(404).json({message: 'cliente não encontrado'})
        }

        if(!valores.nome || !valores.cpf || !valores.telefone){
            return res.status(401).json({message: 'todos os campos são obricatorios'})
        }

        if(!valores.cpf == 11){
            return res.status(401).json({message: 'é obrigatorio 11 digitos do cpf'})
        }

        if(!valores.cpf){
            const CPF = CryptoJS.AES.encrypt(valores.cpf,CHAVE_SECRETA).toString()
            valores.cpf = CPF
        } 

        await Cliente.update(valores,{where: {codCliente: id}})

        return res.status(201).json({message: 'Cliente atualizado com sucesso'})
    }catch(err){
        console.error('Erro ao atualizado Cliente',err)
        return res.status(400).json({message: 'Erro ao atualizar Cliente'})
    }
}

module.exports = { cadastrar, consultarID, apagar, atualizar}