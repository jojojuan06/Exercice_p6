// require pour importer package express
const express =  require('express');

// appelle de la methode express (une function) permet de crée une application expresse
const app = express();

// reponse par default et donc retourn bien notre application
app.use((request, response) => {
    response.json({message: 'Votre  requête a bien été  reçue !'}); /* reponse au format objet json */
});

// exporter cette appliction pour y avoir acces depuis les autre fichier de notre projet notament le server node
module.exports = app;