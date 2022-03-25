import React, { useEffect, useRef, useState } from 'react';

import './styleConteiner.css'

export default function CadastroConteiner() {
  


  const [form, setForm] = useState({
    id: '',
    nome_cliente: '',
    numero_conteiner: '',
    tipo: '',
    status: '',
    categoria: ''
  })
  const valorId = useRef()
  const inputName = useRef()
  const inputConteiner = useRef()
  const inputTipo = useRef()
  const inputStatus = useRef()
  const inputCategoria = useRef()
  const botaoDeCadastro = useRef(true)

  const [banco, setBanco] = useState([])

  function handleSubmit(event) {

    event.preventDefault()
    form.numero_conteiner = form.numero_conteiner.toUpperCase()
    const numero = form.numero_conteiner.substring(4,11)
    if (form.numero_conteiner.length !== 11 ){
      alert('Formato: ABCD1234567, 11 digitos')
      window.location.reload();
     } else if (!form.nome_cliente || !form.numero_conteiner || !inputTipo.current.value 
      || !inputStatus.current.value || !inputCategoria.current.value ){
        alert('Todos os campos devem ser preenchidos!')
        window.location.reload();
        
    } else {
        handleRouteButton()
    }
    
  }

 

  function handleChangeForm(event) {
    const value = event.target.value
    event.preventDefault()

    setForm({ ...form, [event.target.name]: value })

  }
  useEffect(() => {
    const requisicao = fetch('http://localhost:3030/conteiners')
    requisicao.then(function (resposta) {
      const respostaJson = resposta.json()
      respostaJson.then(function (body) {
        setBanco(body)
     })
    })

  }, [])

  function handleCadastroConteiner() {

    fetch('http://localhost:3030/conteiners/', {
      method: 'POST',
      body: JSON.stringify({
        nome_cliente: form.nome_cliente,
        numero_conteiner: form.numero_conteiner,
        tipo: inputTipo.current.value,
        status: inputStatus.current.value,
        categoria: inputCategoria.current.value
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    window.location.reload();

  }


  function handleAtualizarConteiner(id) {

    valorId.current = id


    botaoDeCadastro.current = false
    

    fetch(`http://localhost:3030/conteiners/${valorId.current}`)
      .then((response) => response.json())
      .then((json) => {


        inputName.current.value = json.nome_cliente
        inputConteiner.current.value = json.numero_conteiner
        inputTipo.current.value = json.tipo
        inputStatus.current.value = json.staus
        inputCategoria.current.value = json.categoria

        setForm({
          nome_cliente: json.nome_cliente,
          numero_conteiner: json.numero_conteiner,
          tipo: json.tipo,
          status: json.status,
          categoria: json.categoria
        })


      });

  }

  function handleRouteButton() {
    
    if (botaoDeCadastro.current) {
     
    
      handleCadastroConteiner()
    } else {
    
      fetch(`http://localhost:3030/conteiners/${valorId.current}`, {
        method: 'PUT',
        body: JSON.stringify({
          nome_cliente: form.nome_cliente,
          numero_conteiner: form.numero_conteiner,
          tipo: form.tipo,
          status: form.status,
          categoria: form.categoria
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
      botaoDeCadastro.current = true
     
      window.location.reload();

    }

  }
  function handleDeletarConteiner(id) {
    alert('Certeza?')
    fetch(`http://localhost:3030/conteiners/${id}`, {
      method: 'DELETE',

    });
    window.location.reload();
  }


  return (


    <div className="cadastroConteiner">

      <h1>Conteiner</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='nome_cliente'>Nome do cliente</label>
          <input type='text' ref={inputName}
            value={form.nome_cliente} name='nome_cliente'
            onChange={(e) => handleChangeForm(e)} />
        </div>

        <div>
          <label htmlFor='numero_conteiner'>número do contêiner</label>
          <input type='text' ref={inputConteiner} value={form.numero_conteiner}
            name='numero_conteiner' onChange={(e) => handleChangeForm(e)} />
        </div>

        <div>
          <label htmlFor='tipo_mov'>Tipo</label>
          <select name='tipo' ref={inputTipo}>
            <option value=''></option>
            <option value='20'>20</option>
            <option value='40'>40</option>
          </select>
        </div>

        <div>
          <label htmlFor='status'>status</label>
          <select name='status' ref={inputStatus}>
            <option value=''></option>
            <option value='vazio'>vazio</option>
            <option value='cheio'>cheio</option>
          </select>
        </div>
        <div>
          <label htmlFor='categoria'>categoria</label>
          <select name='categoria' ref={inputCategoria}>
            <option value=''></option>
            <option value='importacao'>importação</option>
            <option value='exportacao'>exportação</option>
          </select>
        </div>

        <input type='submit' className='button-sub'
          ref={botaoDeCadastro}
          onClick={() =>  handleSubmit()} />
     
      </form>





      <table>
        <thead>
          <tr>
            <th>cliente</th>
            <th>número do contêiner</th>
            <th>tipo</th>
            <th>status</th>
            <th>categoria</th>
            <th>ações</th>
          </tr>
        </thead>
        <tbody>
          {banco.map(e => {
            return (

              <tr key={e.id} >

                <td>{e.nome_cliente}</td>
                <td>{e.numero_conteiner}</td>
                <td>{e.tipo}</td>
                <td>{e.status}</td>
                <td>{e.categoria}</td>

                <td><strong className='botao-deletar-atualizar' style={{ color: 'red' }} type='button' onClick={() => handleDeletarConteiner(e.id)}>deletar</strong>
                  <strong className='botao-deletar-atualizar' style={{ color: 'green' }} type='button' onClick={() => handleAtualizarConteiner(e.id)}>atualizar</strong></td>
              </tr>)
          })}
        </tbody>
      </table>

    </div>
  );
}

