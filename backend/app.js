// **** aplication express require pour importer package express ********
const express =  require('express');

// importez mongoose dans votre fichier 
const mongoose = require('mongoose');

// importez body-parser dans votre fichier Analysez les corps de requête entrants dans un middleware avant vos gestionnaires, disponibles sous la req.bodypropriété.
const bodyParser = require('body-parser');

//importer de model thing crée
const Thing = require('./models/thing');



// connection a la base de donnée mongooose -----------
mongoose.connect('mongodb+srv://jojo:3f0kukHOv1LGYea5@cluster0.wi3rn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {     
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
//---------------------


// appelle de la methode express (une function) permet de crée une application expresse
const app = express();

// exporter cette application pour y avoir acces depuis les autre fichier de notre projet notament le server node
module.exports = app;

//acces au corp de la requete
app.use(express.json());// intercepte toute les requetes qui on un content type json (format) et mais a disposition dans le  cors sur objet req  (body)

//*********Creation de Middleware********
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



//route Post pour evoyer la requete//

app.post('/api/stuff', (req, res, next) => {
    delete req.body._id; // enlever le champ id du corp de la requete (methode delete) car mongoos le genere automatiquement
    const thing = new Thing({ /* creation d'une nouvelle instance (class objet) de le req*/  
        ...req.body // operateur spread vas copier les champ de l'objet , dans le corp de la request body
    });
    thing.save() //methode save enregistre l'objet dans la base
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))//retourne une promise asynchrone qui attend ,201 la requête a réussi avec le message
        .catch(error => res.status(400).json({ error })); // capture l'erreur
});


//route get pour recuperer tous le objet du site 
app.get('/api/stuff', (req, res, next) => {    //url viser (route a contacter) par l'application route http://localhost:3000  

        //création des objet-----------
    const stuff = [
            {
                _id: 'oeihfzeoi',    //clée valeur
                title: 'Mon premier objet',
                description: 'Les infos de mon premier objet',
                imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
                price: 4900, //evite les chiffre a virgule , centimes pour eviter les erreurs d'arithmétique (calcul)
                userId: 'qsomihvqios',
            },
            {
                _id: 'oeihfzeomoihi',
                title: 'Mon deuxième objet',
                description: 'Les infos de mon deuxième objet',
                imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
                price: 2900,
                userId: 'qsomihvqios',
            },
        ];
    res.status(200).json(stuff); // retourne le status ex 200 pour ok pour la methode http , revoi la reponse json (body) stuff
});
//------------------