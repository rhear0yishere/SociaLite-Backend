const
    express = require('express');
    app = express();
    router = express.Router();
    channelControllers = require('../controllers/channel');
    jwt = require('jsonwebtoken');
    eventControllers = require('../controllers/event');
    postControllers = require('../controllers/post');
    commentControllers = require('../controllers/comment');


    router.get('/', channelControllers.findAllChannels);
    router.get('/:channel_id', channelControllers.show);
    router.delete('/:channel_id', channelControllers.deleteChannel);
    router.post('/', channelControllers.postChannel);


    router.post('/:channel_id/events/:event_id', eventControllers.deleteEvent);
    router.post('/:channel_id/events', eventControllers.postEvent);
    router.post('/:channel_id/events/:event_id/edit', eventControllers.editEvent);



    router.post('/:channel_id/events/:event_id/posts', postControllers.makePost);
    router.post('/:channel_id/events/:event_id/posts/:post_id', postControllers.deletePost);

    router.post('/:channel_id/events/:event_id/posts/:post_id/comments', commentControllers.makeComment);


    // router.use((req, res, next) => {
    //     console.log('activated')
    //     const bearerHeader = req.headers['authorization'];
    //     console.log('triggered token check', bearerHeader)
    
    //     if (typeof bearerHeader !== 'undefined') {
    //         const bearer = bearerHeader.split(' ');
    //         const bearerToken = bearer[1];
    //         req.token = bearerToken;
    //         let verified = jwt.verify(req.token, 'cantaloupe');
    //         console.log('here is the verified', verified)
    //         req.userId = verified._id
    //         next(); 
    //     } else {
    //         res.sendStatus(403);
    //     }
    // })
    
 

module.exports = router;