const multer = require('multer');
const path = require('path');

exports.storageMusic = multer.diskStorage({
  destination: function (req, file, cb) {
    if(file.fieldname === 'background') {
      const pathBackground = path.join(__dirname, '../public', 'background');
      cb(null, pathBackground)
    } else if(file.fieldname === 'music'){
      const pathMusic = path.join(__dirname, '../public', 'music');
      cb(null, pathMusic)
    } 
  },
  filename: function (req, file, cb) {
    const {name} = req.body;
    let nameCustom = '';
    name.split(' ').forEach(item => {
      nameCustom += item;
    })

    if(file.fieldname === 'background' || file.fieldname === 'avatar') {
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

exports.storageSinger = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathAvatar = path.join(__dirname, '../public', 'avatar');
    cb(null, pathAvatar)
  },
  filename: function (req, file, cb) {
    if(file.fieldname === 'avatar') {
      const { fullname } = req.body;
      let nameSinger = 'Singer-'.concat(fullname);
      if(file.mimetype === 'image/png') {
        nameSinger += '.png';
      } else if(file.mimetype === 'image/jpeg') {
        nameSinger += '.jpg';
      } else if(file.mimetype === 'image/jpg') {
        nameSinger += '.jpg';
      }
      cb(null, nameSinger);
    } else if(file.fieldname === 'background'){
      const { fullname } = req.body;
      let nameSinger = 'Singer-background-'.concat(fullname);
      if(file.mimetype === 'image/png') {
        nameSinger += '.png';
      } else if(file.mimetype === 'image/jpeg') {
        nameSinger += '.jpg';
      } else if(file.mimetype === 'image/jpg') {
        nameSinger += '.jpg';
      }
      cb(null, nameSinger);
    } 
   
  }
})

exports.storagePlaylist = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathAvatar = path.join(__dirname, '../public', 'backgroundPlaylist');
    cb(null, pathAvatar)
  },
  filename: function (req, file, cb) {
    const { title } = req.body;
    let namePlaylist = 'Playlist-'.concat(title);
    if(file.mimetype === 'image/png') {
      namePlaylist += '.png';
    } else if(file.mimetype === 'image/jpeg') {
      namePlaylist += '.jpg';
    } else if(file.mimetype === 'image/jpg') {
      namePlaylist += '.jpg';
    }
    cb(null, namePlaylist);
  }
})

exports.storageVideo = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathAvatar = path.join(__dirname, '../public', 'backgroundVideo');
    cb(null, pathAvatar)
  },
  filename: function (req, file, cb) {
    const { title } = req.body;
    let nameVideo = 'Video-'.concat(title);
    if(file.mimetype === 'image/png') {
      nameVideo += '.png';
    } else if(file.mimetype === 'image/jpeg') {
      nameVideo += '.jpg';
    } else if(file.mimetype === 'image/jpg') {
      nameVideo += '.jpg';
    }
    cb(null, nameVideo);
  }
})
