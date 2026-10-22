const con = require('../db')

const login = (req, res) => {
    const {email, senha} = req.body
    const sql = 'SELECT id, nome, email FROM usuario WHERE email = ? AND senha = password(?);'
    con.query(sql, [email, senha], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ erro: 'Erro ao listar usuarios' })
        } else {
            if (results.length == 0) {
                res.status(404).json("Acesso negado, credenciais invalidas")
            } else{
                res.json(results)
            }
        }
    })
}

const cadastrar = (req, res) => {
    const { nome, email, senha } = req.body
    try {
    const query = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, password(?));'
    con.query(query, [nome, email, senha], (err, results) => {
        if(err) {
            console.error(err)
            res.status(500).json({error: 'Erro ao cadastrar usuario'})
        }else{
            res.status(201).json({ message: 'Usuario cadastrado com sucesso', results})
        }
    })
} catch (error) {
    console.error(error)
    res.status(400).json({ error: 'Erro ao cadastrar usuario', details: 'Informe { nome, email, senha }' })
}
}

const listar = (req, res) => {
    const query = 'SELECT * FROM usuario;'
    con.query(query, (err, results) => {
        if(err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar usuarios'})
        }else{
            res.json(results)
        }
    })
}

const alterar = (req, res) => {
    const { id } = req.params
    const { nome, email, senha } = req.body

    const query = 'UPDATE usuario SET nome = ?, email = ?, senha = password(?) WHERE id = ?;'
    con.query(query, [nome, email, senha, id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao alterar usuario' })
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Usuario nao encontrado' })
        } else {
            res.json({ message: 'Usuario alterado com sucesso', results })
        }
    })
}

const excluir = (req, res) => {
    const { id } = req.params

    const query = 'DELETE FROM usuario WHERE id = ?;'
    con.query(query, [id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao excluir usuario' })
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Usuario nao encontrado' })
        } else {
            res.json({ message: 'Usuario excluido com sucesso' })
        }
    })
}

module.exports = {
    login,
    cadastrar,
    alterar,
    excluir,
    listar
}