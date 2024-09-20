'use strict';
const mysql = require('mysql');

//local mysql db connection
const dbConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : ''
});

dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Gerenciador de Banco de dados MySql Conectado !");

  /* ************************* 
   CRIAÇÃO DO BANCO DE DADOS   
  /* ************************* */
  var dbName = "Monitorar-Vigencias"; 
  dbConn.query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?", dbName, function(err, result) {
    if (err) throw err;
    if (result.length > 0) {
      console.log("Banco de Dados | " +  dbName + " Existente !");

    } else {
        
      dbConn.query("CREATE DATABASE ??", dbName, function (err, result) {
        if (err) throw err;
        console.log("Banco de Dados | " +  dbName + " criado com sucesso...");
      });
    }
    dbConn.changeUser({database : dbName}, function(err) {
      if (err) throw err;
    });

  });
   
  // código da criação das Tabelas...

  /* **************************** 
  CRIAÇÃO DA TABELA DE TAGS DE MONITORAMENTO DE SERVIÇOS   
  **************************** */
  dbConn.query(" SELECT * FROM information_schema.tables WHERE table_schema = ? AND table_name = ? LIMIT 1", [dbName, 'tags'], function(err, result) {
    if (err) throw err; 
  
    if (result.length > 0){
      console.log("Tabela Tags | Existente no Banco de Dados " + dbName + " ! "); 
    } else {
      var XSql = `CREATE TABLE tags (
        iDTag BIGINT AUTO_INCREMENT PRIMARY KEY,
        descricao VARCHAR(150) NOT NULL,
        categoria VARChAR(50), 
        infor VARCHAR(255), 
        vigencia DATE NOT NULL,
        foto LONGBLOB,
        status INT UNSIGNED DEFAULT 0 NOT NULL, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`;
      dbConn.query(XSql, function (err, result) {
        if (err) throw err;
          console.log("Tabela Tags de Monitoramento de Serviço | Criada com sucesso no Banco de Dados | " + dbName + " !"); 
      });
    }
  });


  // Fim da criação de Tabelas.

});

module.exports = dbConn;