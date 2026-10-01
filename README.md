# Cadastro de Produtos — MVC

## Nathan Lorenzo — RM: 20240024

## Como executar

cd cadastro-produtos
npm install
npm start

O sistema fica disponível em http://localhost:3000. O banco SQLite database.sqlite é criado na primeira execução na pasta cadastro-produtos

## Funcionalidades

- CRUD dos produtos
- Cadastro e listagem de categorias

## Desafios

**Desafio 1 — Categorias e relacionamento com produtos:** foi criado o Model `Categoria` e estabelecida uma relação 1:n, uma categoria pode ter vários produtos, e cada produto pode pertencer a uma categoria. O formulário de produto permite selecionar uma categoria, a associação é salva no banco e exibida na listagem.

