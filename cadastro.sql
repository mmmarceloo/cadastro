CREATE DATABASE desafioConteiner

create table conteiners(
  id serial primary key,
  nome_cliente text not null,
  numero_conteiner varchar(11),
  tipo smallint,
  status varchar(5),
  categoria varchar(10)
)



create table movimentacoes(
  id serial primary key,
  cliente_id integer not null,
  tipo_mov varchar(20) not null,
  inicio timestamptz not null
  fim timestamptz not null,
  foreign key (cliente_id) references conteiners (id)
  )

