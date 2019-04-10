db = require('../models');
jwt = require('jsonwebtoken');
var mongoose = require('mongoose');


module.exports = {

  makeComment: (req, res) =>{
        let newComment= new db.Comment({
          text: req.body.text,
        })
        let channelId = req.params.channel_id;
          db.Channel.findById(channelId, function(err, channel) {
            if (err) res.send(err);
              else {
                for (i in channel.events ){
                    for (z in channel.events[i].posts){
                        if(channel.events[i].posts[z]._id==req.params.post_id){
                            let postArray = channel.events[i].posts[z].comments
                             postArray.push(newComment)
                            channel.save()
                            res.json(newComment)
                        }
                    }
                }
                  }
                }) 
}

}//end of exports 
