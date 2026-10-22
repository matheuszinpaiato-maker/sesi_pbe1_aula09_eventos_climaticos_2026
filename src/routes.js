const express = require("express")
const router = express.Router()

const usuario = require('./controllers/usuario')
const evento = require('./controllers/evento')

const rotaInicial = (req, res) => {
    res.json("Back-end Eventos Climaticos respondendo")
}

router.get('/',rotaInicial)

router.post('/usuarios/login', usuario.login)
router.get('/usuarios', usuario.listar)
router.post('/usuarios', usuario.cadastrar)
router.put('/usuarios/:id', usuario.alterar)
router.delete('/usuarios/:id', usuario.excluir)

router.get('/eventos', evento.listar)
router.post('/eventos', evento.cadastrar)
router.put('/eventos/:id', evento.alterar)
router.delete('/eventos/:id', evento.excluir)
router.get('/eventos/resumo', evento.resumo)

module.exports = router