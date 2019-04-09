db = require('../models');
jwt = require('jsonwebtoken');

module.exports = {
    findAllChannels: (req, res) =>{
       db.Channel.find({}, (err, channels) =>{
         res.json({channels});
       })
    },
    postChannel: (req, res) =>{
      db.User.findOne({}, (err, user)=>{
        if (err) {
         res.json({err: err, message: 'no dice!!!'})
        } else {
          let newChannel = new db.Channel({
           name: req.body.name
          });
           newChannel.save(() =>{
            res.json(newChannel);
           });
        }
      });
    },
    
  
    show: (req, res) => {
      db.Channel.findById(req.params.channel_id, function(err, channel){
        if (err) res.send(err);
        else res.json(channel);
      }) 

    },

    
    deleteChannel: (req, res) => {
      db.Channel.findByIdAndRemove(req.params.channel_id, function(err, post){
        if (err) res.send(err);
        else res.send("channel deleted");
      }); 
    }
}