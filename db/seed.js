var models = require('../models');

var commentsData = [{
  content: 'Comment A',
  votes: 6
}, {
  content: 'Comment B',
  votes: 3
}, {
  content: 'Comment C',
  votes: 12
}];

models.Channel.remove({}, function(err, res) {
  if (err) {
    console.log('Error removing comments: ', err);
    return;
  }
  console.log('Removed all Comments');

});
