const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const createDatabase = async () => {
    const db = await open({
        filename: "./database.db",
        driver: sqlite3.Database,
    });

    await db.exec(`
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS abrigos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_abrigo TEXT,
            endereco TEXT,
            bairro TEXT,
            cidade TEXT,
            cep TEXT,
            vagas_ocupadas INTEGER,
            vagas_total INTEGER,
            telefone UNIQUE,
            email UNIQUE
        );

        CREATE TABLE IF NOT EXISTS abrigados(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            documento UNIQUE,
            parente TEXT,
            id_abrigo INTEGER,
            FOREIGN KEY (id_abrigo) REFERENCES abrigos (id) ON DELETE SET NULL
        );

        CREATE TABLE IF NOT EXISTS voluntarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            documento UNIQUE NOT NULL,
            profissao TEXT NOT NULL,
            disponibilidade TEXT NOT NULL,
            data_inicio TEXT NOT NULL,
            data_fim TEXT NOT NULL,
            id_abrigo_vinculado INTEGER,
            FOREIGN KEY (id_abrigo_vinculado) REFERENCES abrigos (id)  
        );

        CREATE TABLE IF NOT EXISTS desaparecidos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            documento TEXT,
            endereco TEXT,
            cidade TEXT,
            cidade_desaparecimento TEXT,
            visto_ultimo TEXT,
            parente TEXT
        );
    `)
    console.log("Tabela criada com sucesso!")

    // const abrigos = await db.all(` SELECT * FROM abrigos`)
    // console.log(abrigos)

    // const abrigados = await db.all(` SELECT * FROM abrigados`)
    // console.log(abrigados)

    // const voluntarios = await db.all(` SELECT * FROM voluntarios`)
    // console.log(voluntarios)

    // const desaparecidos = await db.all(` SELECT * FROM desaparecidos`)
    // console.log(desaparecidos)




    return db;
};


const duplicidade = async () => {
    try {
        const sql = `SELECT COUNT (*) AS total FROM ${tabela} WHERE ${coluna} = ?`;
        const resultado = await db.get(sql, [valor]);


        if (resultado.total > 0) {
            console.log(`O valor "${valor}" já registrado anteriormente`)
            return
        } else {
            await db.run(`INSERT INTO ${tabela} WHERE ${coluna} = ?`)
            console.log('Registro realizado com sucesso!')
        }
    }
}


module.exports = { createDatabase, duplicidade };