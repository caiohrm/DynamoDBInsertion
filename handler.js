'use strict';

var AWS = require("aws-sdk");


var docClient = new AWS.DynamoDB.DocumentClient({
  region: "sa-east-1" // Indicate the regions of your AWS server
});

var params = {
  TableName: "Ola", //Table name of DynamoDB tha you want to manipulate
  Item: {
    Name: "TESTE" // Item that you want to insert in to DynamoDb
  }
};

module.exports.hello = async (event, context, callback) => {
  let putItem = new Promise((res, rej) => {
    docClient.put(params, function (err, data) {
      if (err) {
        console.log("Error", err);
        rej(err);
      } else {
        console.log("Success", data);
        res("Hi, insert data completed");
      }
    });
  });
  await putItem.then((value) => {
    Success(value, callback);
  }).catch((ex) => {
    Erro(ex, callback);
  })
};

module.exports.recuperar = async (event, context, callback) => {
  let search = {
    TableName: "Ola", //Table name of DynamoDB tha you want to manipulate
    Key: {
      Name: "TESTE" // Item that you want to insert in to DynamoDb
    }
  };

  let putItem = new Promise((res, rej) => {
    docClient.get(search, function (err, data) {
      if (err) {
        console.log("Error", err);
        rej(err);
      } else {
        console.log("Success", data);
        res(data);
      }
    });
  });
  await putItem.then((value) => {
    Success(value, callback);
  }).catch((ex) => {
    Erro(ex, callback);
  })
};


module.exports.update = async (event, context, callback) => {
  let updateItem = {
    TableName: "Ola",
    Key: {
      Name: "TESTE"
    },
    UpdateExpression: "set sobrenome = :r",
    ExpressionAttributeValues: {
      ":r": "Caio"
    },
    ReturnValues: "UPDATED_NEW"
  };

  let putItem = new Promise((res, rej) => {
    docClient.update(updateItem, function (err, data) {
      if (err) {
        console.log("Error", err);
        rej(err);
      } else {
        console.log("Success", data);
        res(data);
      }
    });
  });
  await putItem.then((value) => {
    Success(value, callback);
  }).catch((ex) => {
    Erro(ex, callback);
  })
};


module.exports.delete = async (event, context, callback) => {
  let deleteItem = {
    TableName: "Ola",
    Key: {
      Name: "TESTE"
    },
  };

  let putItem = new Promise((res, rej) => {
    docClient.delete(deleteItem, function (err, data) {
      if (err) {
        console.log("Error", err);
        rej(err);
      } else {
        console.log("Success", data);
        res(data);
      }
    });
  });
  await putItem.then((value) => {
    Success(value, callback);
  }).catch((ex) => {
    Erro(ex, callback);
  })
};



var Success = (value, callback) => {
  console.log(value);
  var response = {
    "statusCode": 200,
    "body": JSON.stringify(value),
    "isBase64Encoded": false
  };
  callback(null, response);
}


var Erro = (value, callback) => {
  console.log("CAIO");

  console.log(value);

  var response = {
    "statusCode": 400,
    "body": JSON.stringify(value),
    "isBase64Encoded": false
  };
  callback(null, response);
}
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
