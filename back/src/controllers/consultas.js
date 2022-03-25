const conexao = require('../conection')


const totalMovimentacaoCliente = async (req, res) => {
    try {
    const query = 'select cliente_id, tipo_mov, count(*) from movimentacoes group by cliente_id, tipo_mov order by cliente_id' 
    const { rows } = await conexao.query(query)
    return res.status(200).json(rows)
} catch (error) {
    return res.status(400).json(error)
}
}

const sumarioTotal = async (req, res) => {
    try {
        const query = 'select categoria, count(*) from conteiners group by categoria'
        const { rows } = await conexao.query(query)
        return res.status(200).json(rows)
    } catch (error) {
        return res.status(400).json(error)
    }
}

const tabelasUnidas = async (req, res) => {
    try {
        const query = 'select conteiners.id, conteiners.nome_cliente, conteiners.numero_conteiner,conteiners.tipo, conteiners.status, conteiners.categoria, movimentacoes.id as mov_id, movimentacoes.tipo_mov, movimentacoes.inicio, movimentacoes.fim from conteiners, movimentacoes where conteiners.id = movimentacoes.cliente_id order by mov_id'
        const { rows } = await conexao.query(query)
        return res.status(200).json(rows)
    } catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = {
    totalMovimentacaoCliente,
    sumarioTotal,
    tabelasUnidas
}