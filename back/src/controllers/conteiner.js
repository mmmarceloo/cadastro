const conexao = require('../conection')

const listarConteiners = async (req, res) => {
    
    try {
        const { rows } = await conexao.query('select * from conteiners')
        return res.status(200).json(rows)
    } catch (error) {
        return res.status(400).json(error)
    }
}
const listarConteiner = async (req, res) => {
    const { id } = req.params
    try {
        const conteiner = await conexao.query('select * from conteiners where id = $1', [id])
            if ( conteiner.rowCount === 0)
            return res.status(404).json('conteiner não encontrado')


        return res.status(200).json(conteiner.rows[0])
    } catch (error) {
        return res.status(400).json(error)
    }
}

const cadastrarConteiner = async (req, res) => {
    const { nome_cliente, numero_conteiner, tipo, status, categoria} = req.body
    if(!nome_cliente || !numero_conteiner || !tipo || !status || !categoria)
        return req.status(400).json('Todos os campos são obrigatórios')
    try {
        const query = "insert into conteiners (nome_cliente, numero_conteiner, tipo, status, categoria) values ($1,$2,$3,$4,$5)"
        const conteiner = await conexao.query(query, [nome_cliente, numero_conteiner, tipo, status, categoria])

        if(conteiner.rowCount === 0) {
            return res.status(400).json('Não foi possível cadastrar o conteiner')
        }

        return res.status(200).json('Conteiner cadastrado com sucesso')
    } catch (error) {
        return res.status(400).json(error)
    }
}

const atualizarConteiner = async (req, res) => {
    const { id } = req.params
    const { nome_cliente, numero_conteiner, tipo, status, categoria} = req.body
    
    try {
        const query = "select * from conteiners where id = $1"
        const conteiner = await conexao.query(query, [id])
        
        if(conteiner.rowCount === 0) {
            return res.status(404).json('conteiner não encontrado')
        }

        const query2 = "update conteiners set nome_cliente = $1, numero_conteiner = $2, tipo = $3, status = $4, categoria = $5 where id = $6"
        const conteinerAtualizado = await conexao.query(query2,[nome_cliente, numero_conteiner, tipo, status, categoria,id] )
        
        if(conteinerAtualizado.rowCount === 0) {
            return res.status(400).json('Não foi possível cadastrar o conteiner')
        }
        
        return res.status(200).json('Conteiner atualizado com sucesso')
    } catch (error) {
        return res.status(400).json(error)
    }
}

const deletarConteiner = async (req, res) => {
    const { id } = req.params
    try {
        const conteiner = await conexao.query('select * from conteiners where id = $1', [id])
            if ( conteiner.rowCount === 0)
            return res.status(404).json('conteiner não encontrado')

        const query = 'delete from conteiners where id = $1'
        const conteinerDeletado = await conexao.query(query, [id])

        if(conteinerDeletado.rowCount === 0) {
            return res.status(400).json('Não foi possível excluir o conteiner')
        }


        return res.status(200).json('conteiner excluido com sucesso')
    } catch (error) {
        return res.status(400).json(error)
    }
}




module.exports = {
    listarConteiners, 
    listarConteiner,
    cadastrarConteiner,
    atualizarConteiner,
    deletarConteiner
}




