//Config
const dotenv = require('dotenv');
dotenv.config();

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
    UserPoolId: process.env.USERPOOLID, //id del grupo
    ClientId: process.env.CLIENTID //id del cliente
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
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"phone_number",Value:"+51959118844"}));
    //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:scope",Value:"admin"}));

    userPool.signUp('raulgf_02@hotmail.com', 'SamplePassword_123', attributeList, null, function(err, result){
        if (err) {
            console.log(err);
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
}

function Login() {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : 'raulgf_02@hotmail.com',
        Password : 'SamplePassword_123',
    });

    var userData = {
        Username : 'raulgf_02@hotmail.com',
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            console.log('id token + ' + result.getIdToken().getJwtToken());
            console.log('refresh token + ' + result.getRefreshToken().getToken());
        },
        onFailure: function(err) {
            console.log(err);
        },

    });
}

function update(username, password){
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "custom:scope",
        Value: "some new value"
    }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "name",
        Value: "some new value"
    }));

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password,
    });

    var userData = {
        Username: username,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
            //handle error
            console.log(err);
        } else {
            console.log(result);
        }
    });
}

update('raulgf_02@hotmail.com', 'SamplePassword_123')
//RegisterUser();
//Login()