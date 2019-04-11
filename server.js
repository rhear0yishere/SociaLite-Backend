const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer')
const userRoutes = require('./routes/user');
const channelRoutes = require('./routes/channel');
const eventRoutes = require('./routes/event');
const cors=  require ('cors');


const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images')
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({ storage: Storage })

app.get('/images', (req, res) => {
  res.status(200).send('You can post to /api/upload.')
})

app.post('/images/upload', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files)
  console.log('body', req.body)
  res.status(200).json({
    message: 'success!',
  })
})






// Middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static('public'))

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})

app.use('/user', userRoutes);
app.use('/events', eventRoutes);
app.use('/api/channel', channelRoutes);



// app.listen(3001, () => console.log("Listening on 3001"))
 
app.listen(process.env.PORT, () => console.log("Listening on PORT"))
