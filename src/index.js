//Importar dependencias
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

//Informacion del grupo de usuario
const poolData = {
    UserPoolId: "eu-west-1_zjWkXyJsJ",
    ClientId: "5tcge501mvu8c1p4nribffh4t1"
}
const pool_region = 'eu-west-1';
//Iniciar grupo de usuarios
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function RegisterUser(){
    var attributeList = [];
    //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:"Raul"}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"preferred_username",Value:"larry"}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"gender",Value:"male"}));
    //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"birthdate",Value:"1991-06-21"}));
    //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"address",Value:"CMB"}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:"raulgf_02@hotmail.com"}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"phone_number",Value:"959118844"}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:scope",Value:"admin"}));

    userPool.signUp('raulgf_02@hotmail.com', 'SamplePassword123', attributeList, null, function(err, result){
        if (err) {
            console.log(err);
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
}