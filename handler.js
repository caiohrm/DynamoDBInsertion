'use strict';

const dynamo = require('./database/dynamodb')

module.exports.insert = async (event, context, callback) => {
  await response(dynamo.PutItem(JSON.parse(event.body)),callback);
};

module.exports.recuperar = async (event, context, callback) => {
  await response(dynamo.GetItem({
    TableName:event.pathParameters.table,
    Key:{
      Name:event.pathParameters.id
    }
  }),callback);
};


module.exports.update = async (event, context, callback) => {
  await response(dynamo.Update(JSON.parse(event.body)),callback);
};


module.exports.delete = async (event, context, callback) => {
  await response(dynamo.Delete(JSON.parse(event.body)),callback);
};

var response = async (res,callback) =>{
  await res.then((value) => {
    Success(value, callback);
  }).catch((ex) => {
    Erro(ex, callback);
  })
}

var Success = (value, callback) => {
  // console.log(value);
  var response = {
    "statusCode": 200,
    "body": JSON.stringify(value),
    "isBase64Encoded": false
  };
  callback(null, response);
}


var Erro = (value, callback) => {
  // console.log("CAIO");
  var response = {
    "statusCode": 400,
    "body": JSON.stringify(value),
    "isBase64Encoded": false
  };
  callback(null, response);
}
