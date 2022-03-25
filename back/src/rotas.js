const express = require('express')
const { totalMovimentacaoCliente, sumarioTotal, tabelasUnidas } = require('./controllers/consultas')
const { listarConteiners, listarConteiner, cadastrarConteiner, atualizarConteiner, deletarConteiner } = require('./controllers/conteiner')
const { listarMovimentacoes, listarMovimentacao, cadastrarMovimentacao, atualizarMovimentacao, deletarMovimentacao } = require('./controllers/movimentacoes')



const rotas = express()

// movimentacoes

rotas.get('/conteiners', listarConteiners)
rotas.get('/conteiners/:id', listarConteiner)
rotas.post('/conteiners', cadastrarConteiner)
rotas.put('/conteiners/:id', atualizarConteiner)
rotas.delete('/conteiners/:id', deletarConteiner)

//movimentacões

rotas.get('/movimentacoes', listarMovimentacoes)
rotas.get('/movimentacoes/:id', listarMovimentacao)
rotas.post('/movimentacoes/:id', cadastrarMovimentacao)
rotas.put('/movimentacoes/:id', atualizarMovimentacao)
rotas.delete('/movimentacoes/:id', deletarMovimentacao)

// relatorios
rotas.get('/consultas/totalCliente', totalMovimentacaoCliente)
rotas.get('/consultas/sumarioTotal', sumarioTotal)
rotas.get('/consultas/', tabelasUnidas)


module.exports = rotas