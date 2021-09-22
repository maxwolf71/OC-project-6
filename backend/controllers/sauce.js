const Sauce = require('../models/sauce')
const fs = require('fs') // fs = file system (node) -> allow access to files

// CREATE SAUCE (POST) **********************************
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce) 
  delete sauceObject._id // delete id created by frontend
  const sauce = new Sauce({
    ...sauceObject,  // ... = copy all elements of req.body  
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, // get image url
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  })
  sauce.save() // save to DB
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

// UPDATE SAUCE (PUT) **********************************
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?  // is there a new image file ?
    // if yes -> change image / else change only text
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // modify image
    } : { ...req.body }
  Sauce.updateOne({ _id: req.params.id }, {
    ...sauceObject,
    _id: req.params.id
  })
    .then(() => res.status(200).json({ message: 'Sauce updated !' }))
    .catch(error => res.status(400).json({ error }))
}

// DELETE SAUCE (DELETE) **********************************
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) // find sauce id in DB
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1] // get filename of image
      fs.unlink(`images/${filename}`, () => { // unlink = delete image file 
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce deleted !' }))
          .catch(error => res.status(400).json({ error }))
      })
    })
    .catch(error => res.status(500).json({ error }))
}

// Like/dislike system  **********************************

exports.rateSauce = (req, res, next) => {
  switch (req.body.like) { //check if there's a like in the body
    // in case there is :
    case 0:
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          if (sauce.usersLiked.find(user => user === req.body.userId)) { // if user already liked
            Sauce.updateOne({ _id: req.params.id }, { // is the user in the usersLiked array
              $inc: { likes: -1 }, // decrease likes by 1 
              $pull: { usersLiked: req.body.userId }, // remove user from usersLiked
              _id: req.params.id
            })
              .then(() => res.status(200).json({ message: 'Your like has been removed !' }))
              .catch(error => res.status(400).json({ error }))
          }

          if (sauce.usersDisliked.find(user => user === req.body.userId)) { // if user already disliked
            Sauce.updateOne({ _id: req.params.id }, { // check if user in the usersDisliked array
              $inc: { dislikes: -1 }, // decrease dislikes by 1
              $pull: { usersDisliked: req.body.userId }, // remove user from usersDisliked
              _id: req.params.id
            })
              .then(() => res.status(200).json({ message: 'Your dislike has been removed !' }))
              .catch(error => res.status(400).json({ error }))
          }
        })
        .catch(error => res.status(404).json({ error }))
      break

    // add like
    case 1:
      Sauce.updateOne({ _id: req.params.id }, {
        $inc: { likes: 1 },  // increase likes by 1 
        $push: { usersLiked: req.body.userId }, // add user to usersLiked
        _id: req.params.id
      })
        .then(() => res.status(201).json({ message: 'Your like has been added !' }))
        .catch(error => res.status(400).json({ error }))
      break

    // add dislike
    case -1:
      Sauce.updateOne({ _id: req.params.id }, {
        $inc: { dislikes: 1 }, // increase dislikes by 1 
        $push: { usersDisliked: req.body.userId }, // add user to usersDisliked
        _id: req.params.id
      })
        .then(() => res.status(201).json({ message: 'Your dislike has been added !' }))
        .catch(error => res.status(400).json({ error }))
      break

    default:
      console.error('Bad request !')
  }
}
