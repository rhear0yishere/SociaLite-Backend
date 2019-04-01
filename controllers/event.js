db = require('../models');
jwt = require('jsonwebtoken');

module.exports = {
    findAllEvents: (req, res) =>{
       db.Event.find({}, (err, events) =>{
         res.json({events});
       })
    },
    postEvent: (req, res) =>{
      db.User.findOne({}, (err, user)=>{
        if (err) {
         res.json({err: err, message: 'no dice!!!'})
        } else {
          let newEvent = new db.Event({
           title: req.body.title,
           location: req.body.location,
           description: req.body.description, 
           user: user.email
          });
           newChannel.save(() =>{
            res.json(newEvent);
           });
        }
      });
    }
    

}
