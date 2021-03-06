const mongoose = require('mongoose');

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/jwt-auth", {
  useNewUrlParser: true
});

module.exports = {User: require('./User'), 
                  Channel: require('./Channel'),
                Event: require('./Event'),
              Post:require('./Post'),
              Comment: require('./Comment')
              }
