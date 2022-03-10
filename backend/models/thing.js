// importez mongoose dans votre fichier 
const mongoose = require('mongoose');


//permet de créer un schéma de données pour votre base de données MongoDB _id generer par mongodb
const thingSchema = mongoose.Schema({
title: {type : String, require: true }, //require true champ requis
description: { type: String, required: true },
imageUrl: { type: String, required: true },
userId: { type: String, required: true },
price: { type: Number, required: true },
});


// model  transforme ce modèle en un modèle utilisable (nom du model,schema)
module.exports = mongoose.model('Thing', thingSchema);