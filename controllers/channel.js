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
    
    // show(req, res) {
    //   db.Channel.findById(req.params.channel_id, function(err, channel){
    //     if (err) res.send(err);
    //     else res.json(post);
    //   });  
    // }

    show: (req, res) => {
      db.Channel.findById(req.params.channel_id, function(err, channel){
        if (err) res.send(err);
        else res.json(channel);
      }) 

    },

    
    // postChannel: (req, res) =>{
    //   let newChannel = new db.Channel({
    //     name: req.body.name,
    //     createdBy:req.body.createdBy

    //   })
    // },
    updateTip: (req, res)=> {
      let data = JSON.parse(req.params.data);

      db.Tip.findById(data.tipId, (err, tip)=>{
        if (err) {
         res.json({err: err, message: 'Error: No tip found'})
        } else {
            tip.text = data.text;

            tip.save((err)=>{
              if(err) {
                return console.log(err);
              }
              res.json(tip);
            });
        }
      })
    },
    deleteTip: (req, res) => {
      db.Tip.findOneAndDelete({_id: req.params.tipId}, (err, tip)=>{
        if (err) {
         res.json({err: err, message: 'Tip not deleted!!'});
        } else {
          if (!tip) {
            res.json({message: 'cant find the tip!!!'}) 
          } else {
            tip.save((err, deletedTip) =>{
              res.json({message: 'deleted', tip: deletedTip});
             });
          }
        }
      });
    },
    findTipsByCity: (req, res) => {
      db.Tip.find({city: req.params.city}, (err, tips)=>{
        if (err) {
         res.json({err: err, message: 'Error! Did not find tips!!!'})
        } else {
         res.json(tips);         
        }
      });
    }
}