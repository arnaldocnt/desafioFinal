const { createDatabase } = require('../config/database');

exports.listarDesaparecido = async (req, res) => {
    try {
        const db = await createDatabase();
        const desaparecidos = await db.all(`SELECT * FROM desaparecidos`);
        res.json(desaparecidos);
    } catch (e) {
        console.error(e);
        res.status(500).send(e.message);
    }
}

exports.idDesaparecido = async (req, res) => {
    try {
        const { id } = req.params;
        const db = await createDatabase();
        const buscaDesaparecido = await db.get(`SELECT * FROM desaparecidos WHERE id =?`, [id]);
        res.json(buscaDesaparecido);
    } catch (e) {
        console.error(e);
        res.status(500).send(e.message);
    }
}

exports.cadastrarDesaparecido = async (req, res) => {
    try {
        const db = await createDatabase();
        const { nome, CPF, RG, emissor, local_nasc, nacionalidade, idade, data_nasc, sexo, estado_civil, motivos, situacao } = req.body;
        await db.run(
            `INSERT INTO desaparecidos ( nome, CPF, RG, emissor, local_nasc, nacionalidade, idade, data_nasc, sexo, estado_civil, motivos, situacao ) 
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` ,
            [nome, CPF, RG, emissor, local_nasc, nacionalidade, idade, data_nasc, sexo, estado_civil,
                motivos, situacao])

        res.status(201).send("Sucesso!");
    } catch (e) {
        console.error(e);
        res.status(500).send(e.message);
    }
}

exports.atualizarDesaparecido = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, CPF, RG, emissor, local_nasc, nacionalidade, idade, data_nasc, sexo, estado_civil, motivos, situacao } = req.body;
        const db = await createDatabase();
        await db.run(`
            UPDATE desaparecidos
            SET nome = ?, CPF = ?, RG = ?, emissor = ?, local_nasc = ?, nacionalidade = ?, idade = ?, data_nasc = ?, sexo = ?, estado_civil = ?, motivos = ?, situacao = ? WHERE id = ?` , [nome, CPF, RG, emissor, local_nasc, nacionalidade, idade, data_nasc, sexo, estado_civil, motivos, situacao, id])
        res.status(200).json({ mensagem: "Registro atualizado com sucesso!" });
    } catch (e) {
        console.error(e);
        res.status(500).send(e.message);
    }

}

exports.deletarDesaparecido = async (req, res) => {
    try {
        const { id } = req.params;
        const db = await createDatabase();
        await db.run(`DELETE FROM desaparecidos WHERE id = ?`, [id]);
    } catch (e) {
        console.error(e);
        res.status(500).send(e.message);
    }
}