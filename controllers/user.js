const
    bcrypt = require('bcrypt'),
    db = require('../models'),
    jwt = require('jsonwebtoken')

module.exports = {
    

    addChanneltoUser: (req, res) =>{
        let newUserChannel= ({
            addChannel: req.body.addChannel
          })
          let userId = req.params.user_id;
            db.User.findById(userId, function(err, user) {
              if (err) res.send(err);
                else {
                  user.userChannels.push(newUserChannel);
                  user.save();
                  res.json(newUserChannel);
                    }
                  }) 
          
    },

    signup: (req, res) => {
       db.User.find({
                email: req.body.email
            })
            .exec()
            .then(user => {
                if (user.length) {
                    return res.status(409).json({
                        message: "email already exists"
                    })
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            console.log("hashing error:", err);
                            res.status(200).json({
                                error: err
                            })
                        } else {
                            let user = new db.User({
                                email: req.body.email,
                                password: hash
                            });
                            user.save(() =>{
                                let aUser = {email: req.body.email}

                                jwt.sign(
                                    aUser,
                                    "cantaloupe", {
                                        expiresIn: "1h"
                                    },
                                    (err, signedJwt) => {
                                        res.status(200).json({
                                            message: 'User Created',
                                            aUser,
                                            signedJwt
                                        })
                                    });
                            });   
                        }
                    })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    err
                })
            })
    },
    login: (req, res) => {
        console.log("LOGIN CALLED");
        console.log("body", req.body)
        db.User.find({
                email: req.body.email
            })
            .select('+password')
            .exec()
            .then(users => {
                console.log("USERS: ", users);
                if (users.length < 1) {
                    return res.status(401).json({
                        message: "Email/Password incorrect"
                    })
                }
                console.log("body", req.body);
                console.log("hash", users[0].password);
                bcrypt.compare(req.body.password, users[0].password, (err, match) => {
                    console.log(match)
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            err
                        })
                    }
                    if (match) {
                        console.log("MATCH: ", match)
                        let user = {
                            email: users[0].email,
                            _id: users[0]._id
                        }
                        jwt.sign(
                            user,
                            "cantaloupe", {
                                expiresIn: "1h"
                            },
                            (err, signedJwt) => {
                                res.status(200).json({
                                    message: 'Auth successful',
                                    user,
                                    signedJwt
                                })
                            });
                       } else {
                        console.log("NOT A MATCH")
                        res.status(401).json({
                            message: "Email/Password incorrect"
                        })
                    }
                })
            })
            .catch(err => {
                console.log("OUTSIDE ERROR_")
                console.log(err);
                res.status(500).json({
                    err
                })
            })
    },
    findUser: (req, res) => {
        db.User.find((err, foundUsers) => {
          if (err) {
            console.log(err);
          }
          res.json(foundUsers);
        });
      }
}

