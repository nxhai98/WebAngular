const express = require('express');
const route = express.Router();
const roles = require('../_helpers/roles');
const Catalogs = require('../models/Catalog');
const News = require("../models/News")
const authorize = require('../_helpers/authorize');

module.exports = route;

route.get('/catalogs/', function(req, res, next) {
    Catalogs.getListCatalog(function(err, list) {
        if (err) {
            throw err;
        }
        res.json(list);
    })

});

route.get('/catalogs/root/', function(req, res) {
    Catalogs.getRootCatalog(function(err, list) {
        if (err) {
            throw err;
        }
        res.json(list);
    })
})

route.get('/catalogs/search/:key?', function(req, res, next) {
    if (req.params.key) {
        Catalogs.search(req.params.key, function(err, list) {
            if (err) {
                throw err;
            }
            res.json(list);
        })
    }
})

route.post('/catalogs/', authorize(roles.admin), function(req, res, next) {
    Catalogs.addCatalog(req.body, function(err, count) {
        if (err) {
            throw err;
        }
        res.json(count);
    })
})

route.put('/catalogs/:id?', authorize(roles.admin), function(req, res, next) {
    Catalogs.updateCatalog(req.params.id, req.body, function(err, count) {
        if (err) {
            throw err;
        }
        res.json(count);
    })
})

route.delete('/catalogs/:id?', authorize(roles.admin), function(req, res, next) {
    if (req.params.id) {
        Catalogs.remoteCatalog(req.params.id, function(err, count) {
            if (err) {
                res.json(err);
            } else {
                res.json(count);
            }
        })
    }

})