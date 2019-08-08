const express = require('express');
const route = express.Router();
const roles = require('../_helpers/roles');
const Illustration = require('../models/Illustration');
const authorize = require('../_helpers/authorize');
const formidable = require('formidable');
const multer = require('multer');
const path = require('path');

var fs = require('fs');

module.exports = route;

route.get('/:id?', function(req, res, next) {

    Illustration.getImgByNewId(req.params.id, function(err, result) {
        if (err) {
            throw err;
        }

        if (result != '') {
            res.setHeader('content-type', 'image/png');
            res.end(result[0].img);

        }
        res.end('Not Found');

    })

});

route.post('/upload/:newsId?', function(req, res, next) {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var img = {
            img: fs.readFileSync(files.photo.path),
            newsId: req.params.newsId,
            content: 'asddd'

        }

        Illustration.addImg(img, function(err, count) {
            if (err) {
                throw err;
            }

            fs.unlinkSync(files.photo.path);

            res.json('OK');
        })
    })

});

// route.delete('/:newsId?', authorize(roles.admin), function(req, res) {
//     Illustration.remoteImg(req.params.newsId, function(err, count) {
//         if (err) {
//             throw err;
//         }
//         res.json(count);
//     })
// })
route.put('/:newsId?', authorize(roles.admin), function(req, res) {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var img = {
            img: fs.readFileSync(files.photo.path),
            newsId: req.params.newsId,
            content: 'asddd'
        }
        Illustration.updateImg(req.params.newsId, img, function(err, count) {
            fs.unlinkSync(files.photo.path);

            res.json('OK');
        })
    })

})