const con = require('../db')

const cadastrar = (req, res) => {
    const { usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto } = req.body
    try {
    const query = 'INSERT INTO evento (usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto) VALUES (?, ?, ?, ?, ?, ?)'
    con.query(query, [usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto], (err, results) => {
        if(err) {
            console.error(err)
            res.status(500).json({error: 'Erro ao cadastrar evento'})
        }else{
            res.status(201).json({ message: 'Evento cadastrado com sucesso', results})
        }
    })
} catch (error) {
    console.error(error)
    res.status(400).json({ error: 'Erro ao cadastrar evento', details: 'Informe { usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto}' })
}
}

const listar = (req, res) => {
    const query = 'SELECT * FROM evento;'
    con.query(query, (err, results) => {
        if(err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar eventos'})
        }else{
            res.json(results)
        }
    })
}

const alterar = (req, res) => {
    const { id } = req.params
    const { usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto } = req.body

    const query = 'UPDATE evento SET usuarioId = ?, cidade = ?, tipoEvento = ?, temperaturaMaxima = ?, data = ?, nivelImpacto = ? WHERE id = ?;'
    con.query(query, [usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao alterar evento' })
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Evento nao encontrado' })
        } else {
            res.json({ message: 'Evento alterado com sucesso', results })
        }
    })
}

const excluir = (req, res) => {
    const { id } = req.params

    const query = 'DELETE FROM evento WHERE id = ?;'
    con.query(query, [id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao excluir evento' })
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'evento nao encontrado' })
        } else {
            res.json({ message: 'Evento excluido com sucesso' })
        }
    })
}

module.exports = {
    cadastrar,
    excluir,
    alterar,
    listar
}