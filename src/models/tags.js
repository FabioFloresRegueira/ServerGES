'use strict';
var dbConn = require('../config/dbconfig');

// Tabela Cliente e Seus Atributos
var Tags = function(tags){
  this.iDTag = tags.iDTag;
  this.descricao  = tags.descricao; 
  this.categoria = tags.categoria; 
  this.infor = tags.infor; 
  this.vigencia = new Date(tags.vigencia); 
  this.foto  = tags.foto;
  this.status         = tags.status ?? 0;
  this.created_at     = new Date();
  this.updated_at     = new Date();
};


// Metodo: Busca / Lista uma tag de monitoramento de serviço por ID. 
Tags.findById = function (id, result) {

  var xSql = 'SELECT iDTag, descricao, categoria, infor, vigencia, status, created_at, updated_at, ';
      xSql += 'DATEDIFF(vigencia,CURDATE()) as Diasvigencia ';
      xSql += 'FROM tags '; 

  dbConn.query(xSql + "where iDTag = ? ", id, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
  });
};


// Metodo: Lista todas as tags de serviço.
Tags.findAll = function (result) {

  var xSql = "SELECT iDTag, descricao, categoria, infor, vigencia, status, created_at, updated_at, ";
      xSql += "DATEDIFF(vigencia, CURDATE()) as Diasvigencia ";  
      xSql += "FROM tags "  
      xSql += "ORDER BY status desc, Diasvigencia "

    dbConn.query(xSql, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      console.log('Tags : ', res);
      result(null, res);
    }
  });
};


// Metodo: Lista todas as tags de serviço que estão ativas.
Tags.findAllativos = function (result) {

  var xSql = 'SELECT iDTag, descricao, categoria, infor, vigencia, status, created_at, updated_at, ';
      xSql += 'DATEDIFF(vigencia,CURDATE()) as Diasvigencia ';
      xSql += 'FROM tags '; 
      xSql += 'WHERE status =1 ';  
      xSql += 'ORDER BY Diasvigencia '

    dbConn.query(xSql, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      //console.log('Tags : ', res);
      result(null, res);
    }
  });
};


// Metodo: lista as tags de serviços ativas p/a envio no e-mail.
Tags.emailAllativos = function (result) {

  var xSql = 'SELECT descricao as DESCRIÇÃO, categoria as CATEGORIA, DATE_FORMAT(vigencia, "%d/%m/%Y") as VIGÊNCIA, DATEDIFF(vigencia,CURDATE()) as DIASRESTANTES, infor as INFORMAÇÕES ';
      xSql += 'FROM tags '; 
      xSql += 'WHERE status =1 ';  
      xSql += 'ORDER BY DIASRESTANTES'

    dbConn.query(xSql, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      //console.log('Tags : ', res);
      result(null, res);
    }
  });
};


// Metodo: Lista todas as tags de serviço que estão ativas 0 a 30 dias para o termino de vigencia .
Tags.find0a30 = function(result){
    var xSql = 'SELECT iDTag, descricao, categoria, infor, vigencia, status, created_at, updated_at, ';
        xSql += 'DATEDIFF(vigencia,CURDATE()) as Diasvigencia ';
        xSql += 'FROM tags ';
        xSql += 'WHERE status = 1 '; 
        xSql += 'AND ( (DATEDIFF(vigencia, CURDATE()) < 0 ) OR (DATEDIFF(vigencia, CURDATE()) BETWEEN 0 and 30) ) ';
        xSql += 'ORDER BY Diasvigencia'

    dbConn.query(xSql, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      //console.log('Tags : ', res);
      result(null, res);
    }
    });

}

// Metodo: Lista todas as tags de serviço que estão ativas 31 a 60 dias para o termino da vigenci.
Tags.find31a60 = function(result){
  var xSql = 'SELECT iDTag, descricao, categoria, infor, vigencia, status, created_at, updated_at, ';
      xSql += 'DATEDIFF(vigencia,CURDATE()) as Diasvigencia ';
      xSql += 'FROM tags ';
      xSql += 'WHERE status = 1 and DATEDIFF(vigencia, CURDATE()) between 31 and 60 ';
      xSql += 'ORDER BY Diasvigencia'

    dbConn.query(xSql, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      //console.log('Tags : ', res);
      result(null, res);
    }
    });

}

// Metodo: Lista todas as tags de serviço que estão ativas 61 a 90 dias para o termino da vigenci.
Tags.find61a90 = function(result){
  var xSql = 'SELECT iDTag, descricao, categoria, infor, vigencia, status, created_at, updated_at, ';
      xSql += 'DATEDIFF(vigencia,CURDATE()) as Diasvigencia ';
      xSql += 'FROM tags ';
      xSql += 'WHERE status = 1 and DATEDIFF(vigencia, CURDATE()) between 61 and 90 ';
      xSql += 'ORDER BY Diasvigencia'

    dbConn.query(xSql, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      //console.log('Tags : ', res);
      result(null, res);
    }
    });

}

// Metodo: Lista todas as tags de serviço que estão ativas maior que 90 dias para o termino da vigenci.
Tags.findmaior90 = function(result){
  var xSql = 'SELECT iDTag, descricao, categoria, infor, vigencia, status, created_at, updated_at, ';
      xSql += 'DATEDIFF(vigencia,CURDATE()) as Diasvigencia ';
      xSql += 'FROM tags ';
      xSql += 'WHERE status = 1 and DATEDIFF(vigencia, CURDATE()) > 90 ';
      xSql += 'ORDER BY Diasvigencia'

  dbConn.query(xSql, function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(null, err);
  }
  else{
    //console.log('Tags : ', res);
    result(null, res);
  }
  });

}

// Metodo: Lista todas as tags de serviço que estão inativa. 
Tags.findAllinativos = function (result) {
  var xSql = 'SELECT iDTag, descricao, categoria, infor, vigencia, status, created_at, updated_at, ';
      xSql += 'DATEDIFF(vigencia,CURDATE()) as Diasvigencia ';
      xSql += 'FROM tags '; 
      xSql += 'WHERE status=0 '; 
      xSql += 'ORDER BY Diasvigencia '

    dbConn.query(xSql, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      //console.log('Tags : ', res);
      result(null, res);
    }
  });
};


// Metodo: Cria uma tag de monitoramento de serviço.
Tags.create = function (newTags, result) {
  
  const xSql = "INSERT INTO tags (iDTag, descricao, categoria, infor, vigencia, foto, status, created_at, updated_at)  VALUES (?,?,?,?,?,?,?,?,?) "; 
  const values = [newTags.iDTag, newTags.descricao, newTags.categoria, newTags.infor, newTags.vigencia, newTags.foto, newTags.status, newTags.created_at, newTags.updated_at]; // Substitua coluna1 e coluna2 pelos nomes reais das colunas

  dbConn.query(xSql, values, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

// Metodo: Atualiza uma Tag de serviço por ID.
Tags.update = function(id, tags, result){

  var xSql  = 'UPDATE tags SET '; 
      xSql += 'descricao=?, categoria=?, infor=?, '; 
      xSql += ' vigencia = ?, '; 
      xSql += 'foto=?, '; 
      xSql += 'status=?, updated_at=? ';
      xSql += 'WHERE iDTag = ?' 

  dbConn.query(xSql, 
      [ tags.descricao, 
        tags.categoria, 
        tags.infor, 
        tags.vigencia, 
        tags.foto, 
        tags.status, 
        tags.updated_at, id
      ], 

    function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }else{
      result(null, res);
    }
  });
};

// Metodo: Apaga uma Tag por ID.
Tags.delete = function(id, result){
  dbConn.query("DELETE FROM tags WHERE iDTag = ?", [id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
  });
};

// Metodo: Apaga todas os Tags / Limpeza da base de dados 
Tags.limpeza = function(result){
  dbConn.query("DELETE FROM tags ", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
  });
};

module.exports= Tags;
