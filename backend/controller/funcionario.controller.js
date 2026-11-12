const Funcionario = require('../models/Funcionario')
const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'secredo'

const cadastrar = async(req,res)=>{
    const valores = req.body

    
    try{
        if(!valores.nome || !valores.email || !valores.senha){
            return res.status(401).json({message: 'todos os campos são obricatorios'})
        }

        const senhaCrypto = CryptoJS.AES.encrypt(valores.senha,CHAVE_SECRETA).toString()

        await Funcionario.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCrypto,
        })

        return res.status(201).json({message: 'Funcionario cadastrado com sucesso'})
    }catch(err){
        console.error('Erro ao cadastrar Funcionario',err)
        return res.status(400).json({message: 'Erro ao cadastrar Funcionario'})
    }
}

module.exports = {cadastrar}