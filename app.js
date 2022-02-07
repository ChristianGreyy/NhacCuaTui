const express = require('express');
const path = require('path');
const app = express()
const port = 3000
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const multer = require('multer');

const router = require('./routes/index');
const User = require('./models/UserModel');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/NhacCuaTui_dev',
  collection: 'mySessions'
});
store.on('error', function(error) {
  console.log(error);
});

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: store,
}))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(file.fieldname === 'background') {
      const pathBackground = path.join(__dirname, 'public', 'background');
      cb(null, pathBackground)
    } else {
      const pathMusic = path.join(__dirname, 'public', 'music');
      cb(null, pathMusic)
    }
  },
  filename: function (req, file, cb) {
    const {name} = req.body;
    let nameCustom = '';
    name.split(' ').forEach(item => {
      nameCustom += item;
    })

    if(file.fieldname === 'background') {
      let nameBackground = nameCustom;
      if(file.mimetype === 'image/png') {
        nameBackground += '.png';
      } else if(file.mimetype === 'image/jpeg') {
        nameBackground += '.jpg';
      } else if(file.mimetype === 'image/jpg') {
        nameBackground += '.jpg';
      }
      cb(null, nameBackground);
    } else {
      let nameMusic = nameCustom;
      nameMusic += '.mp3';
      cb(null, nameMusic);
    }

  }
})

app.use(multer({storage: storage}).fields([{name: 'background'}, {name: 'music'}]));

app.use((req, res, next) => {
  let isAuthenticated = req.session.user ? true:false;
  if(isAuthenticated) {
    User.findOne({ _id: req.session.user })
    .then(user => {
      req.user = user;
      res.locals.User = user;
      res.locals.isAuthenticated = isAuthenticated;
       next();
    })
    .catch(err => {
      console.log(err);
    })
  } else {
    res.locals.isAuthenticated = isAuthenticated;
    return next();
  }
})

router(app);

mongoose.connect('mongodb://localhost:27017/NhacCuaTui_dev')
.then(result => {
  console.log('Connect successfully')
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  })
})
.catch(err => {
  console.log('err');
})

