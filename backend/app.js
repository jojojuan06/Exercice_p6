// **** aplication express require pour importer package express ********
const express =  require('express');

//-------------------

// importez mongoose dans votre fichier 
const mongoose = require('mongoose');


//importer de model thing crée , pouvoir utiliser notre nouveau modèle Mongoose dans l'application, nous devons l'importer dans le fichier
const Thing = require('./models/thing');

// appelle de la methode express (une function) permet de crée une application expresse
const app = express();

// exporter cette application pour y avoir acces depuis les autre fichier de notre projet notament le server node
module.exports = app;

//acces au corp de la requete (body)
app.use(express.json());// intercepte toute les requetes qui on un content type json (format) et mais a disposition dans le  cors sur objet req  (body)

// -----------conection a la base de donnée mongoose -----------
mongoose.connect('mongodb+srv://jojo:3f0kukHOv1LGYea5@cluster0.wi3rn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {     
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//---------------------




//--------Creation de Middleware--------
//next(); // pour renvoyer vers le prochain middleware

// reponse par default et donc retourn bien notre application on recoit l'objet request response et next pour passez a la suivante
//permet a l'application d'accedera l'api

app.use((req, res, next) => { 

    // * signifie all tous le monde  a acces au serveur origin
    res.setHeader('Access-Control-Allow-Origin', '*'); //header ajouter un header aux routes  setheader sur nos response 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //autorise certaine header (en tete)sur l'objet requete
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //autorise certaine methode requete
    next();
});
//------------------


//--------Route POST -------- envoie la requete

app.post('/api/stuff', (req, res, next) => { 
    //console.log(req.body);
    delete req.body._id; // enlever le champ id (envoyé par le front-end) du corp de la requete (methode delete) car mongoos le genere automatiquement
    const thing = new Thing({ /* creation d'une nouvelle instance (class objet) de le req*/  
        ...req.body // operateur spread (...) vas copier les champ de l'objet , dans le corp de la request body
    });
    thing.save() //methode save enregistre l'objet dans la base de donnée renvoi une promise
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))//retourne une promise asynchrone qui attend ,201 la requête a réussi avec le message
        .catch(error => res.status(400).json({ error })); // capture l'erreur et renvoi un message erreur (egale error: error)
});

//---------------

//--------Route Get --------

//recuper un objet avec l'id
app.get('/api/stuff/:id', (req, res, next) => { // : dit a express cette partie de route est dynamique recuprer l'id
req.params.id // avoir acces  dans l'objet req.pams.id
Thing.findOne({_id: req.params.id}) //trouver un objet , on pass l'objet en conparaison _id  egal le parm de req id
.then(thing => res.status(200).json(thing)) // retourne la response 200 pour ok pour la methode http , renvoi l'objet (un objet)si il existe dans la Bd
.catch(error => res.status(400).json({ error })); //objet non trouver
});


//route  pour recuperer les req  get tous le objet du site 
app.get('/api/stuff', (req, res, next) => {    //url viser (route a contacter) par l'application route http://localhost:3000  
//création des objet-----------
Thing.find() //trouve la liste d'objet (find) qui nous retourne une promise , envoi un tableau contenant tous les Things dans notre base de données
    .then(things => res.status(200).json(things)) // retourne la response 200 pour ok pour la methode http , revoi le tableaux des things recu
    .catch(error => res.status(400).json({ error })); // capture l'erreur et renvoi un message erreur (egale error: error)
});

//------------------


