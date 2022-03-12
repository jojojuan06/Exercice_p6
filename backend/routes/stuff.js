// **** aplication express require pour importer package express ********
const express = require('express');
const stuffControllers = require('../controllers/stuff'); // importation du controller stuff

// Creation d'un routeur
const router = express.Router(); // avec la methode routeur d'expresse (ex remplace app.get par router.get )

//---------  Routes  -----------

//POST (envoie la requete)
router.post('/', stuffControllers.createThing ); // recuperation de l'url du post et du contenue post (creatething(objet body))
//Update (mettre a jour)
router.put('/:id', stuffControllers.modifyThing); // "/"(adresse) + id  en paramettre de route , chemin du contenue la route
//Delete (supprimer l'objet)
router.delete('/:id', stuffControllers.deleteThing); // reagie a la requete delete id en paramettre de route , applique la function a la route
//Get (recupere un / plusieurs objet(s)) , chercher l'identifiant dans la route , " : " dit a express cette partie de route est dynamique recuprer l'id, avec l'id (identifiant vas envoyer l'id de l'objet)
router.get('/:id',stuffControllers.getOneThing); // l'url du post et du contenue post (getOneThing(objet body)) , un seul objet
router.get('/', stuffControllers.getAllThing);//url viser (route a contacter) par l'application route http://localhost:3000  ,  recupere  req(s)  get de tous le objet .

//------------

module.exports = router;  // re-exporte le router de se fichier la


