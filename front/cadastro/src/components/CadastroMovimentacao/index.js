import React, { useEffect, useRef, useState } from 'react';

import '../../components/CadastroMovimentacao/style.css'

export default function CadastroMovimentacao() {
 
  
  let contador = 0
  const [form, setForm] = useState({
    id: '',
    cliente_id: '',
    tipo_mov: '',
    inicio: '',
    fim: '',
  })
  const valorId = useRef()
  const inputName = useRef()
  const inputTipo_mov = useRef()
  const inputInicio = useRef()
  const inputFim = useRef()
  const [botaoDeCadastro, setBotaoDeCadastro] = useState(true)

  const [banco, setBanco] = useState([])

  let itemConsulta = {}
  function handleSubmit(event) {

    event.preventDefault()

  
  }

  function handleChangeForm(event) {
    const value = event.target.value
    event.preventDefault()

    setForm({ ...form, [event.target.name]: value })
    itemConsulta = banco.find(e => {
      return e.id == valorId.current.value
    })

    if (itemConsulta)
      inputName.current.value = itemConsulta.nome_cliente
  }

    useEffect(() => {
  
    const requisicao = fetch('http://localhost:3030/consultas')
    requisicao.then(function (resposta) {
      const respostaJson = resposta.json()
      respostaJson.then(function (body) {
        setBanco(body)

      })
    })

  }, [])






  function handleCadastroMovimentacao(e) {
    const value = e.target.value
  
    fetch(`http://localhost:3030/movimentacoes/${form.id}`, {
      method: 'POST',
      body: JSON.stringify({
        cliente_id: form.cliente_id,
        tipo_mov: inputTipo_mov.current.value,
        inicio: form.inicio,
        fim: form.fim
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    window.location.reload();
  }

  function handleAtualizarMovimentacao(id) {
    valorId.current = id
    itemConsulta = banco.find(e => {
      return e.mov_id == valorId.current
    })

    setBotaoDeCadastro(false)

    inputName.current.value = itemConsulta.nome_cliente
    inputTipo_mov.current.value = itemConsulta.tipo_mov
    inputInicio.current.value = itemConsulta.inicio
    inputFim.current.value = itemConsulta.fim

  }

  function handleRouteButton(e) {

    if (botaoDeCadastro) {
       handleCadastroMovimentacao(e)
    } else {
      fetch(`http://localhost:3030/movimentacoes/${valorId.current}`, {
        method: 'PUT',
        body: JSON.stringify({
          cliente_id: form.cliente_id,
          tipo_mov: inputTipo_mov.current.value,
          inicio: form.inicio,
          fim: form.fim
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
      setBotaoDeCadastro(true)
     

    }
     window.location.reload();
  }

  function handleDeletarMovimentacao(id) {
    alert('Certeza?' + id)
    fetch(`http://localhost:3030/movimentacoes/${id}`, {
      method: 'DELETE',

    });
    window.location.reload();
  }


  return (
    <div className="movimentacao">
      <h1>Movimentacao</h1>

      <form onSubmit={handleSubmit} className='formMov'>
      <div className='box1'>

        <div>
          <label htmlFor='id'>Id do cliente</label>
          <input type='text' ref={valorId}
            value={form.id} name='id'
            onChange={(e) => handleChangeForm(e)} />
        </div>
        <div>
          <label htmlFor='nome_cliente'>Nome do cliente</label>
          <input type='text' ref={inputName}
            value={form.nome_cliente} name='nome_cliente'
            onChange={(e) => handleChangeForm(e)} />
        </div>
          
        <div>
          <label htmlFor='tipo_mov'>Tipo de movimentação</label>
          <select name='tipo_mov' ref={inputTipo_mov}>
            <option value=''></option>
            <option value='embarque'>embarque</option>
            <option value='descarga'>descarga</option>
            <option value='gate-in'>gate-in</option>
            <option value='gate-out'>gate-out</option>
            <option value='reposicionamento'>reposicionamento</option>
            <option value='pesagem'>pesagem</option>
            <option value='scanner'>scanner</option>

          </select>
        </div>
      </div>
      <div className='box2'>

        <div>
          <label htmlFor='inicio'>Inicio</label>
          <input type='datetime-local' ref={inputInicio} value={form.inicio}
            name='inicio' onChange={(e) => handleChangeForm(e)} />
        </div>

        <div>
          <label htmlFor='fim'>fim</label>
          <input type='datetime-local' ref={inputFim}
            value={form.fim} name='fim'
            onChange={(e) => handleChangeForm(e)} />
        </div>



        <input type='submit' className='button-submit'
          onClick={(e) => handleRouteButton(e)} />
      </div>

      </form>

      <table>
        <thead>
          <tr>
            <th>id cliente</th>
            <th>cliente</th>
            <th>tipo movimentação</th>
            <th>inicio</th>
            <th>fim</th>
            <th>ações</th>
          </tr>
        </thead>
        <tbody>


          {banco.map(e => {
            contador++
            return (

              <tr key={e.id_mov} >
                <td>{e.id}</td>
                <td>{e.nome_cliente}</td>
                <td>{e.tipo_mov}</td>
                <td>{e.inicio}</td>
                <td>{e.fim}</td>


                <td><strong className='botao-deletar-atualizar' style={{ color: 'red' }}
                  type='button' onClick={() => handleDeletarMovimentacao(e.mov_id)}>deletar</strong>

                  <strong className='botao-deletar-atualizar' style={{ color: 'green' }}
                    type='button' onClick={() => handleAtualizarMovimentacao(e.mov_id)}>atualizar</strong></td>
              </tr>)
          })}
        </tbody>
      </table>

    </div>
  )
}

