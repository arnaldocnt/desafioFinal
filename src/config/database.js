const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const createDatabase = async () => {
    const db = await open({
        filename: "./database.db",
        driver: sqlite3.Database,
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        telefone TEXT
    );

        CREATE TABLE IF NOT EXISTS desaparecidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        CPF INTEGER UNIQUE NOT NULL,
        RG INTEGER UNIQUE NOT NULL,
        emissor TEXT NOT NULL,
        local_nasc TEXT NOT NULL,
        nacionalidade TEXT NOT NULL,
        idade INTEGER NOT NULL,
        data_nasc INTEGER NOT NULL,
        sexo TEXT CHECK(sexo IN ('M', 'F', 'O')), 
        estado_civil TEXT CHECK(estado_civil IN ('solteiro', 'casado', 'divorciado', 'viuvo', 'outros', 'uniao_estavel')),
        motivos TEXT NOT NULL,
        situacao TEXT NOT NULL    
    );
`);
    console.log("Tabela criada com sucesso!")
    return db;
};


module.exports = { createDatabase };