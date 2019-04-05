db = require('../models');
jwt = require('jsonwebtoken');
// ObjectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');


module.exports = {

  postEvent: (req, res) =>{
        let newEvent= new db.Event({
          title: req.body.title,
          location: req.body.location
        })
        let channelId = req.params.channel_id;
          db.Channel.findById(channelId, function(err, channel) {
            if (err) res.send(err);
              else {
                channel.events.push(newEvent);
                channel.save();
                res.json(newEvent);
                  }
                }) 
},

    findAllEvents: (req, res) =>{
       db.Event.find({}, (err, events) =>{
         res.json({events});
       })
    },

}//end of exports 


