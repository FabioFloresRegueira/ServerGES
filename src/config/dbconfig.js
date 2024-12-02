'use strict';
const mysql = require('mysql2');

//Carrega as variaveis de ambientes ( arquivo *.env - o mesmo deve estar no raiz do projeto)
require('dotenv').config();
//console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS);


/* Conexão local - xampp mysql version 15.1 Distrib 10.4.28-MariaDB, for Win64 (AMD64)
Liberar a conexão de volta para o pool após o uso é importante por várias razões:
https://github.com/sidorares/node-mysql2/issues/1898
Eficiência de Recursos: Manter um número limitado de conexões abertas ao banco de dados ajuda a gerenciar os recursos do servidor de forma eficiente. Conexões abertas consomem memória e outros recursos.
Reutilização de Conexões: Ao liberar a conexão, ela pode ser reutilizada por outras partes do aplicativo que precisam acessar o banco de dados. Isso reduz o tempo e o custo de estabelecer novas conexões repetidamente.
Estabilidade do Sistema: Manter muitas conexões abertas simultaneamente pode sobrecarregar o banco de dados e o servidor, levando a problemas de desempenho ou até falhas. O uso de um pool de conexões ajuda a evitar esses problemas.
Gerenciamento de Conexões: O pool de conexões gerencia automaticamente a criação e a liberação de conexões, garantindo que sempre haja conexões disponíveis quando necessário, sem exceder o limite configurado.
*/

//const dbConn = mysql.createConnection({
const dbConn = mysql.createPool({
  connectionLimit: 10, // Número máximo de conexões no pool
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'fabio4678_servicos', // Especifica o banco de dados aqui
  authPlugins: {
    caching_sha2_password: mysql.authPlugins.caching_sha2_password
  }
});
 

/*
// INTEGRATOR HOST
//const dbConn = mysql.createConnection({
const dbConn = mysql.createPool({
  connectionLimit: 10, // Número máximo de conexões no pool
  host     : 'localhost',          //process.env.DB_HOST,
  user     : 'fabio4678_userGES', //process.env.DB_USER,
  password : '6Kud1kljEN',         //process.env.DB_PASS,   
  database: 'fabio4678_servicos', // Especifica o banco de dados aqui
  authPlugins: {
    caching_sha2_password: mysql.authPlugins.caching_sha2_password
  }
});
*/ 

// undefined undefined undefined
/*
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASS) {
  throw new Error("Variáveis de ambiente não definidas corretamente.");
} else {
  //const dbConn = mysql.createConnection({
  const dbConn = mysql.createPool({
  connectionLimit: 10, // Número máximo de conexões no pool
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,   
  database: 'fabio4678_servicos', // Especifica o banco de dados aqui
    authPlugins: {
      caching_sha2_password: mysql.authPlugins.caching_sha2_password
    }
  });
}
*/ 

function connectToDatabase() {
  dbConn.getConnection((err, connection) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
      return;
    }
    console.log("Gerenciador de Banco de dados MySql Conectado!");

    // Use a conexão
    checkDatabase(connection);
  });
}

function checkDatabase(connection) {
  const dbName = "fabio4678_servicos";
  connection.query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?", [dbName], function(err, result) {
    if (err) {
      console.error("Erro ao verificar o banco de dados:", err);
      connection.release();
      return;
    }

    if (result.length > 0) {
      console.log("Banco de Dados | " + dbName + " Existente!");
      //useDatabase(connection, dbName);
      checkTable(connection); 
    } else {
      createDatabase(connection, dbName);
    }
  });
}

function createDatabase(connection, dbName) {
  connection.query(`CREATE DATABASE ??`, [dbName], function(err, result) {
    if (err) {
      console.error("Erro ao criar o banco de dados:", err);
      connection.release();
      return;
    }
    console.log("Banco de Dados | " + dbName + " criado com sucesso...");
    useDatabase(connection, dbName);
  });
}

function useDatabase(connection, dbName) {
  connection.query(`USE ??`, [dbName], function(err) {
    if (err) {
      console.error("Erro ao usar o banco de dados:", err);
      connection.release();
      return;
    }
    console.log("Usando o banco de dados:", dbName);
    checkTable(connection);
  });
}

function checkTable(connection) {
  const dbName = "fabio4678_servicos";
  connection.query("SELECT * FROM information_schema.tables WHERE table_schema = ? AND table_name = ? LIMIT 1", [dbName, 'tags'], function(err, result) {
    if (err) {
      console.error("Erro ao verificar a tabela:", err);
      connection.release();
      return;
    }

    if (result.length > 0) {
      console.log("Tabela Tags | Existente no Banco de Dados " + dbName + "!");
      connection.release();
    } else {
      createTable(connection);
    }
  });
}

function createTable(connection) {
  const createTableSQL = `CREATE TABLE tags (
    iDTag BIGINT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(150) NOT NULL,
    categoria VARCHAR(50), 
    infor VARCHAR(1200), 
    vigencia DATE NOT NULL,
    foto LONGBLOB,
    status INT UNSIGNED DEFAULT 0 NOT NULL, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`;

  connection.query(createTableSQL, function(err, result) {
    if (err) {
      console.error("Erro ao criar a tabela:", err);
      connection.release();
      return;
    }
    console.log("Tabela Tags de Monitoramento de Serviço | Criada com sucesso no Banco de Dados!");
    connection.release();
  });
}

connectToDatabase();

module.exports = dbConn;






/*
=============================================================================
SEM POOL DE CONEXÕES 
=============================================================================

function connectToDatabase() {
  dbConn.connect(function(err) {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
      dbConn.end();
      return;
    }
    console.log("Gerenciador de Banco de dados MySql Conectado!");
    checkDatabase();
  });
}

function checkDatabase() {
  const dbName = "fabio4678_servicos";
  dbConn.query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?", [dbName], function(err, result) {
    if (err) {
      console.error("Erro ao verificar o banco de dados:", err);
      dbConn.end();
      return;
    }

    if (result.length > 0) {
      console.log("Banco de Dados | " + dbName + " Existente!");
      useDatabase(dbName);
    } else {
      createDatabase(dbName);
    }
  });
}

function createDatabase(dbName) {
  dbConn.query("CREATE DATABASE ??", [dbName], function(err, result) {
    if (err) {
      console.error("Erro ao criar o banco de dados:", err);
      dbConn.end();
      return;
    }
    console.log("Banco de Dados | " + dbName + " criado com sucesso...");
    useDatabase(dbName);
  });
}

function useDatabase(dbName) {
  dbConn.changeUser({database: dbName}, function(err) {
    if (err) {
      console.error("Erro ao mudar de usuário:", err);
      dbConn.end();
      return;
    }
    checkTable();
  });
}

function checkTable() {
  const dbName = "fabio4678_servicos";
  dbConn.query("SELECT * FROM information_schema.tables WHERE table_schema = ? AND table_name = ? LIMIT 1", [dbName, 'tags'], function(err, result) {
    if (err) {
      console.error("Erro ao verificar a tabela:", err);
      dbConn.end();
      return;
    }

    if (result.length > 0) {
      console.log("Tabela Tags | Existente no Banco de Dados " + dbName + "!");
    } else {
      createTable();
    }
  });
}

function createTable() {
  const createTableSQL = `CREATE TABLE tags (
    iDTag BIGINT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(150) NOT NULL,
    categoria VARCHAR(50), 
    infor VARCHAR(1200), 
    vigencia DATE NOT NULL,
    foto LONGBLOB,
    status INT UNSIGNED DEFAULT 0 NOT NULL, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`;

  dbConn.query(createTableSQL, function(err, result) {
    if (err) {
      console.error("Erro ao criar a tabela:", err);
      dbConn.end();
      return;
    }
    console.log("Tabela Tags de Monitoramento de Serviço | Criada com sucesso no Banco de Dados!");
  });
}

connectToDatabase();

module.exports = dbConn;
*/