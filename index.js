const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send("API Gestão Eletronica de Serviços | Servidor em Execução . . . ");
});

// ROTAS 
const clienteRoutes = require('./src/routes/tags.routes')
app.use('/monitorar/api/tags', clienteRoutes)

// Servidor 
app.listen(port, () => {
  console.log(`SERVIÇOS CRUD ESTÃO SENDO EXECUTADOS NA PORTA: ${port}`);
});


//********************************************************* */
// SERVIÇOS DE Email ( GMAIL )
//
//********************************************************* */
'use strict';
const Tags = require('../serverges/src/models/tags');

const nodemailer = require('nodemailer');
const cron = require('node-cron');


// Crie um objeto transportador
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Substitua pelo seu host SMTP
    port: 465, // Porta do servidor TLS
    secure: true, // true para 465, false para outras portas
    auth: {
      user: 'deployment.erp@gmail.com', // meu gmail. 
      pass: 'vmje cbov pphf yqze' // Sua senha de aplicativo configurado no gmail. 
    }
});

// Função para obter o resultado da consulta usando callback
function getResult(callback) {
    Tags.emailAllativos((err, rows) => {
        if (err) {
            console.error('Erro ao obter o resultado da consulta:', err);
            return callback(err, null);
        }
        callback(null, rows);
    });
}

// Agende a tarefa para enviar o email automaticamente
cron.schedule('01 08 * * *', () => {
    getResult((err, result) => {
        if (err) {
            return console.error('Erro ao obter o resultado da consulta ou enviar o email:', err);
        }

        // Gere a tabela HTML a partir do resultado
        const tableHTML = generateTable(result,'ACOMPANHAMENTO DE VIGÊNCIAS');

        // Defina as opções do email
        const mailOptions = {
            from: 'erp.deployment@gmail.com',
            to: 'fabio.regueira@portonovosa.com',
            subject: 'WEBGES',
            text: `Gestão Eletrônica de Serviços: ${JSON.stringify(result)}`,
            //html: `<b>Aqui está o resultado da sua consulta:</b><pre>${JSON.stringify(result, null, 2)}</pre>`
            html: `<b><h1>WebGES - Gestão Eletronica de Serviços:</h1></b>${tableHTML}`
        
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Email enviado: ' + info.response);
        });
    });
});



// transforma o resultado da função getResult() no layout de tabela\html 
function generateTable(data, titulo) {

  const now = new Date();
  const dateTimeString = now.toLocaleString();

  let table = `<h2>${titulo}</h2>`;
  table += `<p>Data e Hora: ${dateTimeString}</p>`;
  table += '<table style="width: 100%; border-collapse: collapse; margin: 25px 0; font-size: 18px; text-align: left;">';
  table += '<thead style="background-color: #007bff; color: white;"><tr>';
  
  // Adicione os cabeçalhos da tabela
  for (let key in data[0]) {
      table += `<th style="padding: 12px 15px; border: 1px solid #ddd;">${key}</th>`;
  }
  table += '</tr></thead><tbody>';
  
  // Adicione as linhas da tabela
  data.forEach((row, index) => {
      const rowStyle = index % 2 === 0 ? 'background-color: #f2f2f2;' : '';
      table += `<tr style="${rowStyle}">`;
      for (let key in row) {
          table += `<td style="padding: 12px 15px; border: 1px solid #ddd;">${row[key]}</td>`;
      }
      table += '</tr>';
  });
  table += '</tbody></table>';
  return table;

}

console.log('Agendador de emails iniciado...');