const express = require('express');
const app = express();
const { createDatabase, duplicidade } = require('./database');

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`Servidor rodando com Express!`)
})

app.post('/abrigos', async (req, res) => {
    const db = await createDatabase();
    const { id, nome_abrigo, endereco, bairro, cidade, cep, vagas_ocupadas, vagas_total, telefone, email } = req.body;

    await db.run(
        `INSERT INTO abrigos ( id, nome_abrigo, endereco, bairro, cidade, cep, vagas_ocupadas, vagas_total, telefone, email ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, nome_abrigo, endereco, bairro, cidade, cep, vagas_ocupadas, vagas_total, telefone, email]
    )

    res.status(201).json({ mensagem: "Cadastro realizado com sucesso!" });
});


app.get('/abrigos', async (req, res) => {
    const db = await createDatabase();
    const abrigos = await db.all(`SELECT * FROM abrigos`)
    res.json(abrigos)
})

app.get('/abrigos/:id', async (req, res) => {
    const { id } = req.params
    const db = await createDatabase()
    const abrigoEspecifico = await db.all(`SELECT * FROM abrigos WHERE id = ?`, [id])
    res.json(abrigoEspecifico)
})

app.post('/abrigados', async (req, res) => {
    const db = await createDatabase();
    const { id, nome, documento, parente, id_abrigo } = req.body;

    await db.run(`INSERT INTO abrigados ( id, nome, documento, parente, id_abrigo )
        VALUES (?, ?, ? ,? ,?)`,
        [id, nome, documento, parente, id_abrigo]
    )
    res.status(201).json({ mensagem: "Cadastro realizado com sucesso!" });
})

app.get('/abrigados', async (req, res) => {
    const db = await createDatabase();
    const abrigados = await db.all(`SELECT * FROM abrigados`);

    res.json(abrigados)
})

app.get('/abrigados/:id', async (req, res) => {
    const { id } = req.params
    const db = await createDatabase();
    const abrigadoEspecifico = await db.all(`SELECT * FROM abrigados WHERE id = ?`, [id]);

    res.json(abrigadoEspecifico)
})

app.post('/voluntarios', async (req, res) => {
    const db = await createDatabase();
    const { id, nome, documento, profissao, disponibilidade, data_inicio, data_fim } = req.body;

    await db.run(`INSERT INTO (id, nome, documento, profissao, disponibilidade, data_inicio, data_fim)
        VALUE(?, ?, ?, ?, ?, ?, ?)`,
        [id, nome, documento, profissao, disponibilidade, data_inicio, data_fim]
    )
    res.status(201).json({ mensagem: "Cadastro realizado com sucesso!" });
})

app.get('/voluntarios', async (req, res) => {
    const db = await createDatabase();
    const voluntarios = await db.all(
        `SELECT * FROM voluntarios`);

    res.json(voluntarios)
})

app.get('/volutarios/:id', async (req, res) => {
    const { id } = req.params
    const db = await createDatabase();
    const voluntarioEspecifico = await db.all(`SELECT * FROM voluntarios WHERE id = ?`, [id]);

    res.json(voluntarioEspecifico)
})

app.post('/desaparecidos', async (req, res) => {
    const db = await createDatabase();
    const { id, nome, documento, endereco, cidade, cidade_desaparecimento, visto_ultimo, parente } = req.body;

    await db.run(`INSERT INTO (id, nome, documento, endereco, cidade, cidade_desaparecimento, visto_ultimo, parente)
        VALUE(?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, nome, documento, endereco, cidade, cidade_desaparecimento, visto_ultimo, parente]
    )
    res.status(201).json({ mensagem: "Cadastro realizado com sucesso!" });
})

app.get('/desaparecidos', async (req, res) => {
    const db = await createDatabase();
    const desaparecidos = await db.all(
        `SELECT * FROM desaparecidos`);

    res.json(desaparecidos)
})

app.get('/desaparecidos/:id', async (req, res) => {
    const { id } = req.params
    const db = await createDatabase();
    const desaparecidoEspecifico = await db.all(`SELECT * FROM desaparecidos WHERE id = ?`, [id]);

    res.json(desaparecidoEspecifico)
})




app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
