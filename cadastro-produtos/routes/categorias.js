const express = require('express');
const router = express.Router();

const { Categoria } = require('../models');

router.get('/', async (req, res) => {
	const categorias = await Categoria.findAll({ order: [['nome', 'ASC']] });

	res.render('categorias/index', { categorias });
});

router.post('/', async (req, res) => {
	const nome = typeof req.body.nome === 'string' ? req.body.nome.trim() : '';

	if (!nome) {
		return res.status(400).send('Informe o nome da categoria.');
	}

	await Categoria.findOrCreate({ where: { nome } });

	res.redirect('/categorias');
});

module.exports = router;
