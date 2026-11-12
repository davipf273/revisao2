const { Funcionario, Cliente, Equipamento, Inspecao} = require('./models/rel')
const conn = require('./db/conn')

async function sync() {
    try{
        console.log('iniciando conexão com o banco de dados')
        await conn.sync({force:true})
    }catch(err){
        console.error('Erro ao sicronizar com o banco de dados',err)
    }finally{
        console.log('fechando conexão com o banco de dados')
        await conn.close()
    }
}

sync()