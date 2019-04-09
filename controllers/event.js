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

    deleteEvent: (req, res) => {
      let channelId = req.params.channel_id
      let eventId = req.params.event_id 
      db.Channel.findById(channelId, function(err, foundChannel){
        if(err){res.status(500).send(err);}
        let foundEvent = foundChannel.events;
        console.log(foundEvent, "EVENTS")
        console.log(foundEvent[0]._id, "ID ?")
        for (i in foundEvent){
          if(foundEvent[i]._id == eventId){
            foundEvent.splice(i,1)
          }
        }
        foundChannel.save()

      }); 
    }


    




        


     

}//end of exports 


