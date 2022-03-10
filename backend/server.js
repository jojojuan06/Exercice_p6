//importer package http de node , importer le contenue d'un module require
const http = require('http'); /* on a acces a l'objet http qui nous permet de crée un serveur , on get pour recuperer*/
//importer app.js
const app = require('./app');
// indiquer sur quelle port elle vas tourner , on set le port et environement ou 3000
app.set ('port', process.env.PORT || 3000)

/*créons un nouvel objet server via la fonction createServer() , pour envoyer  une requete a se serveur cette function sera appelé*/
const server = http.createServer(app); //une function expresse qui va recevoir la requete et la reponse de app.js qui est appeler


// (request, response) => { function fléché  en argument request, response
// response.end('voila la reponse serveur !')}); .end de l'objet ,renvoi une response L’appel à End() a mis fin à la requête active de type string par ex.

//Démarre le serveur HTTP à l'écoute des connexions attendre les requete envoyer. 
server.listen(process.env.PORT || 3000);/*si l'environement tourne le serveur vous envoi un port a utiliser ou port 3000 part default a ecouter */