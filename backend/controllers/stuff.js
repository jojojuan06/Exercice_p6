//importer de model thing crée , pouvoir utiliser notre nouveau modèle Mongoose dans l'application, nous devons l'importer dans le fichier
const Thing = require('../models/thing');

//---------controller------------- (contenue des routes)

// POST-----
exports.createThing = (req, res, next) => { //exporter une function creatething / contenue de la route post / creation dun post
    //body correspond au model de l'objet que l'on envoi
    delete req.body._id; // enlever le champ id (envoyé par le front-end) du corp de la requete (methode delete) car mongoos le genere automatiquement
    const thing = new Thing({ /* creation d'une nouvelle instance  de mon objet thing (class) de le req*/  
        ...req.body // operateur spread (...) vas copier les champ de l'objet , dans le corp de la request body
    });
    thing.save() //methode save enregistre l'objet dans la base de donnée renvoi une promise
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))//retourne une promise asynchrone qui attend ,201 la requête a réussi avec le message
        .catch(error => res.status(400).json({ error })); // capture l'erreur et renvoi un message erreur (egale error: error)
}
//---------

// PUT (modifier / mise a jour de l'objet) -----

exports.modifyThing = (req, res, next) => { //exporter une function creatething / contenue de la route post / creation dun post  
    Thing.updateOne({_id: req.params.id }, // egale (clée -> valeur) function pour modifier un things (produit) dans la base de donnée
    {...req.body,  //  spread pour recuperer le thing (produit) qui est dans le corp de la requete (objet body)
    _id: req.params.id }) // et dire que l'id corespond a celui dees paramettre
    .then(() => res.status(200).json({message: 'Objet modifié !'})) // retourne la response 200 pour ok pour la methode http , renvoi objet modifier
    .catch(error => res.status(400).json({ error })); // capture l'erreur et renvoi un message erreur (egale error: error)
}

//---------------

// DELETE (supprimer / suppression de l'objet) -----

exports.deleteThing = (req, res, next) => {  
    //recuperer l'id des paramettre de route
    Thing.deleteOne({_id: req.params.id }) // egale (clée -> valeur) function pour supprimer un things (produit) dans la base de donnée    
    .then(() => res.status(200).json({message: 'Objet supprimer !'})) // retourne la response 200 pour ok pour la methode http , renvoi objet modifier
    .catch(error => res.status(400).json({ error })); // capture l'erreur et renvoi un message erreur (egale error: error)
}

//---------------


// GET (recuperation / recuperer le/les l'objet) -----

// recuperer  un objet
exports.getOneThing = (req, res, next) => { 
    req.params.id // avoir acces  dans l'objet req.pams.id
    Thing.findOne({_id: req.params.id}) //trouver un objet , on pass l'objet en conparaison _id  egal le parm de req id
    .then(thing => res.status(200).json(thing)) // retourne la response 200 pour ok pour la methode http , renvoi l'objet (un objet)si il existe dans la Bd
    .catch(error => res.status(400).json({ error })); //objet non trouver
}

// recuperer  les objet
exports.getAllThing = (req, res, next) => {    
    //création des objet-----------
    Thing.find() //trouve la liste d'objet (find) qui nous retourne une promise , envoi un tableau contenant tous les Things dans notre base de données
        .then(things => res.status(200).json(things)) // retourne la response 200 pour ok pour la methode http , revoi le tableaux des things recu
        .catch(error => res.status(400).json({ error })); // capture l'erreur et renvoi un message erreur (egale error: error)
    }
//----------------