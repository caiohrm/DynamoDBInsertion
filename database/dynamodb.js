'use strict'

var AWS = require("aws-sdk");
const rest = require('./rest');


var docClient = new AWS.DynamoDB.DocumentClient({
    region: "sa-east-1" // Indicate the regions of your AWS server
});


module.exports.PutItem = (params) => {
    console.log(params);
    return new Promise((resolve, reject) => {
        docClient.put(params, function (err, data) {
            if (err) {
                console.error(err);
                reject(err);
            }
            console.log("Success", data);
            const response = rest.response(200, data, endpoint);
            resolve(response);

        });
    });

}

module.exports.Delete = (deleteItem) => {
    return new Promise((res, rej) => {
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
}

module.exports.GetItem = (getItem) => {
    return new Promise((res, rej) => {
        docClient.get(getItem, function (err, data) {
            if (err) {
                console.log("Error", err);
                rej(err);
            } else {
                console.log("Success", data);
                res(data);
            }
        });
    });
}

module.exports.Update = (updateItem) => {
    let update = {
        TableName: "",
        Key: {
            Name: updateItem.Keys
        },
        UpdateExpression: "set sobrenome = :r",
        ExpressionAttributeValues: {
            ":r": "Caio"
        },
        ReturnValues: "UPDATED_NEW"
    }
    update.TableName = updateItem.TableName;
    update.Key.Name = updateItem.Keys
    console.log(update);
    
    return new Promise((res, rej) => {
        docClient.update(update, function (err, data) {
            if (err) {
                console.log("Error", err);
                rej(err);
            } else {
                console.log("Success", data);
                res(data);
            }
        });
    });
}