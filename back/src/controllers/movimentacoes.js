const conexao = require('../conection')

const listarMovimentacoes = async (req, res) => {
    
    try {
        const { rows } = await conexao.query('select * from movimentacoes')
        return res.status(200).json(rows)
    } catch (error) {
        return res.status(400).json(error)
    }
}
const listarMovimentacao = async (req, res) => {
    const { id } = req.params
    try {
        const movimentacao = await conexao.query('select * from movimentacoes where id = $1', [id])
            if ( movimentacao.rowCount === 0)
            return res.status(404).json('movimentacao não encontrada')


        return res.status(200).json(movimentacao.rows[0])
    } catch (error) {
        return res.status(400).json(error)
    }
}

const cadastrarMovimentacao = async (req, res) => {
    const { id } = req.params
    const { tipo_mov, inicio, fim} = req.body
    if(!tipo_mov ||  !inicio ||  !fim)
        return req.status(400).json('Todos os campos são obrigatórios')

    try {
        const conteiner = await conexao.query('select * from conteiners where id = $1', [id])
            if ( conteiner.rowCount === 0)
            return res.status(404).json('conteiner não encontrado')

        const query = "insert into movimentacoes (cliente_id, tipo_mov, inicio, fim) values ($1,$2,$3,$4)"
        const  movimentacao = await conexao.query(query, [id, tipo_mov, inicio, fim])

        if(movimentacao.rowCount === 0) {
            return res.status(400).json('Não foi possível cadastrar a movimentacao')
        }

        return res.status(200).json('Movimentacao cadastrada com sucesso')
    } catch (error) {
        return res.status(400).json(error)
    }
}

const atualizarMovimentacao = async (req, res) => {
    const { id } = req.params
    const { tipo_mov, inicio, fim} = req.body
    
    try {
        const query = "select * from movimentacoes where id = $1"
        const movimentacao = await conexao.query(query, [id])
        
        if(movimentacao.rowCount === 0) {
            return res.status(404).json('movimentacao não encontrada')
        }

        const query2 = "update movimentacoes set tipo_mov = $1, inicio = $2, fim = $3  where id = $4"
        const movimentacaoAtualizado = await conexao.query(query2,[tipo_mov, inicio, fim, id] )
        
        if(movimentacaoAtualizado.rowCount === 0) {
            return res.status(400).json('Não foi possível cadastrar a movimentacao')
        }
        
        return res.status(200).json('Movimentacao atualizada com sucesso')
    } catch (error) {
        return res.status(400).json(error)
    }
}

const deletarMovimentacao = async (req, res) => {
    const { id } = req.params
    try {
        const movimentacao = await conexao.query('select * from movimentacoes where id = $1', [id])
            if ( movimentacao.rowCount === 0)
            return res.status(404).json('movimentacao não encontrado')

        const query = 'delete from movimentacoes where id = $1'
        const movimentacaoDeletada = await conexao.query(query, [id])

        if(movimentacaoDeletada .rowCount === 0) {
            return res.status(400).json('Não foi possível excluir a movimentacao')
        }


        return res.status(200).json('movimentacao excluida com sucesso')
    } catch (error) {
        return res.status(400).json(error)
    }
}




module.exports = {
  listarMovimentacao,
  listarMovimentacoes,
  cadastrarMovimentacao,
  atualizarMovimentacao,
  deletarMovimentacao
}




