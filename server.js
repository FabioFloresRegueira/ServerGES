const express = require('express');

const cors = require('cors'); 

const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.get('/', (req, res) => {
  res.send("API Monitoramento das Vigencias de Serviços | Servidor em Execução . . . ");
});

// ROTAS 
const clienteRoutes = require('./src/routes/tags.routes')
app.use('/monitorar/api/tags', clienteRoutes)

// Servidor
app.listen(port, () => {
  console.log(`O SERVIDOR ESTÁ SENDO EXECUTADO NA PORTA: ${port}`);
});