const Sauce = require('../models/sauce')
// fs = file system (node) -> allow access to files
const fs = require('fs')

// CREATE SAUCE (POST) **********************************
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    // delete id created by frontend 
    delete sauceObject._id
    const sauce = new Sauce({
        // ... copy of all elements of req.body  
        ...sauceObject,
        // get image url
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    // save to DB
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce registered !' }))
        .catch(error => res.status(400).json({ error }))
}

// GET ONE SAUCE (GET) **********************************
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }))
}

// GET ALL SAUCES (GET) **********************************
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }))
}

// MODIFY SAUCE (PUT) **********************************
exports.modifySauce = (req, res, next) => {
    // is there a new image file ?
    const sauceObject = req.file ?
    // if yes -> change image / else change only text
        {
            ...JSON.parse(req.body.sauce),
            // modify image
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body }
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce updated !' }))
        .catch(error => res.status(400).json({ error }))
}

// DELETE SAUCE (DELETE) **********************************
exports.deleteSauce = (req, res, next) => {
    // find sauce in DB
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // get filename of image
            const filename = sauce.imageUrl.split('/images/')[1]
            // unlink = delete file (path + what to do)
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce deleted !' }))
                    .catch(error => res.status(400).json({ error }))
            })
        })
        .catch(error => res.status(500).json({ error }))
}

