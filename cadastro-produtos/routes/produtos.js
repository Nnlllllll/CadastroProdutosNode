const express = require('express');
const router = express.Router();

const { Produto, Categoria } = require('../models');

const nomesDeCategoria = {
  'Informática': 'Informática',
  'Periféricos': 'Periféricos',
  'Celulares': 'Celulares',
  Audio: 'Áudio',
  'Acessórios': 'Acessórios'
};

async function buscarCategoria(tipo) {
  const nome = nomesDeCategoria[tipo] || tipo;

  if (typeof nome !== 'string' || !nome.trim()) {
    return null;
  }

  const [categoria] = await Categoria.findOrCreate({
    where: { nome: nome.trim() }
  });

  return categoria;
}

function tipoDaCategoria(categoria) {
  if (!categoria) {
    return '';
  }

  return categoria.nome === 'Áudio' ? 'Audio' : categoria.nome;
}

router.get('/', async (req, res) => {
  const produtos = await Produto.findAll({
    include: [{ model: Categoria, as: 'categoria' }]
  });

  res.render('produtos/index', {
    produtos
  });
});

router.get('/novo', async (req, res) => {
  const categorias = await Categoria.findAll({ order: [['nome', 'ASC']] });

  res.render('produtos/novo', { categorias });
});

router.post('/', async (req, res) => {
  const categoria = await buscarCategoria(req.body.tipo);

  if (!categoria) {
    return res.status(400).send('Selecione uma categoria válida.');
  }

  await Produto.create({
    nome: req.body.nome,
    preco: req.body.preco,
    quantidade: req.body.quantidade,
    categoriaId: categoria.id
  });

  res.redirect('/produtos');
});

router.get('/:id/editar', async (req, res) => {
  const [produto, categorias] = await Promise.all([
    Produto.findByPk(req.params.id, {
      include: [{ model: Categoria, as: 'categoria' }]
    }),
    Categoria.findAll({ order: [['nome', 'ASC']] })
  ]);

  res.render('produtos/editar', {
    produto,
    categorias,
    tipoSelecionado: tipoDaCategoria(produto && produto.categoria)
  });
});

router.post('/:id', async (req, res) => {
  const categoria = await buscarCategoria(req.body.tipo);

  if (!categoria) {
    return res.status(400).send('Selecione uma categoria válida.');
  }

  await Produto.update({
    nome: req.body.nome,
    preco: req.body.preco,
    quantidade: req.body.quantidade,
    categoriaId: categoria.id
  }, {
    where: {
      id: req.params.id
    }
  });

  res.redirect('/produtos');
});

router.post('/:id/deletar', async (req, res) => {
  await Produto.destroy({
    where: {
      id: req.params.id
    }
  });

  res.redirect('/produtos');
});

module.exports = router;