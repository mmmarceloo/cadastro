import React, { useEffect, useState } from 'react';

import './style.css'

export default function Relatorio() {
  

  const [categorias, setCategorias] = useState([])
  const [totais, setTotais] = useState([])



  useEffect(() => {
    
    const requisicao = fetch('http://localhost:3030/consultas/sumarioTotal')
    requisicao.then(function (resposta) {
      const respostaJson = resposta.json()
      respostaJson.then(function (body) {
       setCategorias(body)
       })
    })

  }, [])

  useEffect(() => {
    const requisicao = fetch('http://localhost:3030/consultas/totalCliente')
    requisicao.then(function (resposta) {
      const respostaJson = resposta.json()
      respostaJson.then(function (body) {
    setTotais(body)
      
      })
    })

  }, [])


  return (


    <div className="relatorio">

      <h1>Relatorio</h1>
      <div className='conteiner'>
        <div>
          <h2>Sumário de categorias</h2>
          <table className='tabelaCategorias'>
            <thead>
              <tr>
                <th>Importação</th>
                <th>Exportação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {categorias.map(e => {
                  return (
                    <th>{e.count}</th>
                  )
                })}
              </tr>
            </tbody>
          </table>

        </div>

        <div>
          <h2>Totais</h2>
          <table>
            <thead>
              <tr>
                <th>Id do cliente</th>
                <th>Tipo de movimentação</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>

              {totais.map(e => {
                return (
                  <tr>
                    <th>{e.cliente_id}</th>
                    <th>{e.tipo_mov}</th>
                    <th>{e.count}</th>
                  </tr>
                )
              })}

            </tbody>
          </table>

        </div>


      </div>
    </div>
  );
}

