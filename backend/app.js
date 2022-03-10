// **** aplication express require pour importer package express ********
const express =  require('express');

// appelle de la methode express (une function) permet de crée une application expresse
const app = express();




//*********Creation de Middleware********

app.use((req, res, next) => {
    console.log('Requête reçue'); // renvoie cette premier reponse
    next(); // pour renvoyer la reponse
});

app.use((req, res, next) => {
    res.status(201); // retourne le status ex 200 pour ok pour la methode http
    next(); // pour renvoyer vers le prochain middleware
});

// reponse par default et donc retourn bien notre application on recoit l'objet request response et next pour passez a la suivante
app.use((req, res , next) => {
    res.json({message: 'Votre  requête a bien été  reçue !'}); /* reponse au format objet json */
    next(); // pour renvoyer vers le prochain middleware
});

app.use((req, res) => {
    console.log('Réponse envoyer avec succes !');
});

// exporter cette appliction pour y avoir acces depuis les autre fichier de notre projet notament le server node
module.exports = app;