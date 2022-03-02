const express = require('express');
const path = require('path');
const app = express()
const port = 3000
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

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
app.use(flash());

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
    res.locals.User = {
      _id: '777777777777777777777777',
    }
    return next();
  }
})

router(app);

mongoose.connect('mongodb+srv://ChristianGrey:hungtruong2k2@cluster0.2oakb.mongodb.net/musics?retryWrites=true&w=majority')
.then(result => {
  console.log('Connect successfully')
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  })
})
.catch(err => {
  console.log('err');
})

