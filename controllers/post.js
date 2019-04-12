db = require('../models');
jwt = require('jsonwebtoken');
var mongoose = require('mongoose');


module.exports = {

  makePost: (req, res) =>{
        let newPost= new db.Post({
          text: req.body.text,
          image: req.body.image
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
},
deletePost: (req, res) => {
  let channelId = req.params.channel_id
  let eventId = req.params.event_id 
  let postId = req.params.post_id 
  db.Channel.findById(channelId, function(err, foundChannel){
    if(err){res.status(500).send(err);}
    let foundEvent = foundChannel.events;
    for (i in foundEvent){
      if(foundEvent[i]._id == eventId){
        let foundPosts= foundEvent[i].posts
        for(z in foundPosts){
          if(foundPosts[z]._id== postId){
              foundPosts.splice(i,1)
          }
        }

        
      }
    }
    foundChannel.save()

  }); 
}

}//end of exports 


