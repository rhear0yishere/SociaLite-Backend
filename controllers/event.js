db = require('../models');
jwt = require('jsonwebtoken');
// ObjectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');

var ObjectId = mongoose.Types.ObjectId;

module.exports = {

  postEvent: (req, res) =>{
        let newEvent= new db.Event({
          title: req.body.title,
          location: req.body.location
        })
        let channelId = req.params.channel_id;
        // let id= ObjectId(req.params.channel_id)
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

}


//end of function
    // findAllEvents: (req, res) =>{
    //    db.Event.find({}, (err, events) =>{
    //      res.json({events});
    //    })
    // },
    
    // postEvent: (req, res) =>{
    //   db.Event.create(req.body, function(err, event){
    //     if (err) res.end(err);
    //     else {
    //       db.Channel.findById(req.params.channel_id, function(err, channel) {
    //         if (err) res.send(err);
    //         else {
    //           channel.events.push(event);
    //           channel.save();
    //           res.json(events);
    //         }
    //       })
    //     }
    //   });
      

    // }


    





// db.User.findOne({}, (err, user)=>{
//   if (err) {
//    res.json({err: err, message: 'no dice!!!'})
//   } else {
//     let newEvent = new db.Event({
//      title: req.body.title,
//      location: req.body.location,
//     });
//      newEvent.save(() =>{
//       res.json(newEvent);
//      });
//   }
// });