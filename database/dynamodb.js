'use strict'

var AWS = require("aws-sdk");

const rest = require('../rest');
var options = {}
// connect to local DB if running offline
if (true) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8080',
    };
} else {
    options = {
        region: "sa-east-1" // Indicate the regions of your AWS server
    }
}

var docClient = new AWS.DynamoDB.DocumentClient(options);

var params = {
    TableName: "Ola", //Table name of DynamoDB tha you want to manipulate
    Item: {
        Name: "TESTE" // Item that you want to insert in to DynamoDb
    }
};

module.exports.PutItem = () => {
    return new Promise((resolve, reject) => {
        docClient.put(params, function (err, data) {
            if (err) {
                console.error(err);
                reject(err);
            }
            console.log("Success", data);
            const response = rest.response(200, dbParams.Item, endpoint);
            resolve(response);

        });
    });

}