db = require('../models');
jwt = require('jsonwebtoken');
var mongoose = require('mongoose');


module.exports = {

  makePost: (req, res) =>{
        let newPost= new db.Post({
          text: req.body.text,
        })
        let channelId = req.params.channel_id;
          db.Channel.findById(channelId, function(err, channel) {
            if (err) res.send(err);
              else {
                for (i in channel.events ){
                  if (channel.events[i]._id== req.params.event_id){
                    channel.events[i].posts.push(newPost);
                    channel.save();
                    res.json(newPost);
                  }
                }
                  }
                }) 
}

}//end of exports 


