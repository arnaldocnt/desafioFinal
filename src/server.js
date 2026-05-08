const express = require('express');
const app = express();
const desaparecidosRoutes = require('./routes/desaparecidosRoutes');
const authRoutes = require('./routes/authRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes')


const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`Servidor rodando com Express!`)
})

app.use('/api', desaparecidosRoutes); 
app.use('/auth', authRoutes);
app.use('/api', usuariosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
