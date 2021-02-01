const express = require('express');
const router = express.Router();
const { Photo } = require('../models/models')
router.route('/').get(async (req, res) => {
  let photos = await Photo.find();
  if (req.session?.userId) {
    photos = photos.map(el => {
      if ((el.userId).toString() == (req.session.userId).toString()) {
        el.authorised = true
      }
      return el
    })
  }
  res.render('main', { photos });
}).patch((req, res) => {
  //тут когда-нибудь будет логика подгрузки контента
  res.end()
})

router.route('/upload').get((req, res) => {
  res.render('upload');
}).post(async (req, res) => {
  //регулярка, чтобы создать ссылку на мини-версию картинки
  let regExp = /(https:\/\/cdn\.filestackcontent\.com\/)(\w*)/i;
  let newPhoto = new Photo({
    url: req.body.url,
    urlToMini: (req.body.url).toString().replace(regExp, '$1resize=w:100,h:100,fit:crop/$2'),
    comment: req.body.comment,
    userId: req.session.userId,
  })
  await newPhoto.save();
  res.end()
});

router.get('/delete/:id', async (req, res) => {
  await Photo.deleteOne({ _id: req.params.id });
  res.redirect('/')
})

module.exports = router
