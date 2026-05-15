const { createDatabase } = require('../config/database');
const { hashPassword } = require('../models/users');

exports.listarUsuario = async (req, res) => {
    try {
        const db = await createDatabase();
        const usuarios = await db.all(`SELECT * FROM usuarios`);
        res.json(usuarios);

    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar dados." });
    }
}

exports.idUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const db = await createDatabase();
        const busca = await db.get(`SELECT * FROM usuarios WHERE id = ?`, [id]);
        res.json(busca);
    } catch (e) {
        console.error(e);
        res.status(500).send(e.message);
    }
}

exports.cadastrarUsuario = async (req, res) => {
    try {
        const db = await createDatabase();
        const { nome, email, senha, telefone } = req.body;
        const senhaComHash = await hashPassword(senha);

        await db.run(`
            INSERT INTO usuarios ( nome, email, senha, telefone ) VALUES (?, ?, ?, ?)`, [nome, email, senhaComHash, telefone])
        res.status(201).send("Sucesso!");
    } catch (e) {
        console.error(e);
        res.status(500).send(e.message);
    }
}

exports.deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const db = createDatabase();
        const deletar = await db.run(`DELETE FROM usuarios WHERE id = ?`, [id]);
    } catch (e) {
        console.error(e);
        res.status(500).send(e.message);
    }
}