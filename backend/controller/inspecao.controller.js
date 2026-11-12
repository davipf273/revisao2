const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'secredo'

const cadastrar = async(req,res)=>{
    const valores = req.body

    try{
        if(!valores.idEquip || !valores.status || !valores.data ){
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

module.exports = {cadastrar}