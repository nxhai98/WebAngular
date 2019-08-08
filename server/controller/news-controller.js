const express = require('express');
const route = express.Router();
const roles = require('../_helpers/roles');
const News = require('../models/News');
const Illustration = require('../models/Illustration');
const Comment = require('../models/Comment')
const authorize = require('../_helpers/authorize');


module.exports = route;

route.get('/page/:page?', function(req, res, next) {
    if (req.params.page) {
        News.getNews(req.params.page, 1, function(err, news) {
            if (err) {
                throw err;
            }
            res.json(news);
        });
    } else {
        News.getNumberOfNews(1, function(err, num) {
            if (err) {
                throw err;
            }
            res.json(Math.ceil(num[0].Sum / 2));
        });
    }

});

route.get('/accept/page/:page?', authorize(roles.admin), function(req, res) {
    if (req.params.page) {
        News.getNews(req.params.page, 0, function(err, news) {
            if (err) {
                throw err;
            }
            res.json(news);
        });
    } else {
        News.getNumberOfNews(0, function(err, num) {
            if (err) {
                throw err;
            }
            res.json(Math.ceil(num[0].Sum / 2));
        });
    }
});

route.get('/catalog/:id?/page/:page?', function(req, res) {
    if (req.params.id && req.params.page) {
        News.getNewByCatalog(req.params.id, req.params.page, function(err, list) {
            if (err) {
                throw err;
            }
            res.json(list);
        })
    } else if (req.params.id) {
        News.getNewCountByCatalog(req.params.id, function(err, count) {
            if (err) {
                throw err;
            }
            res.json(Math.ceil(count[0].Sum / 2))
        })
    }

});

route.get('/search/:key?', function(req, res, next) {
    if (req.params.key) {
        News.search(req.params.key, function(err, list) {
            if (err) {
                throw err;
            }
            res.json(list);
        })
    }
})

route.get('/id/:id?', function(req, res, next) {
    News.getById(req.params.id, function(err, data) {
        if (err) {
            throw err;
        }
        res.json(data);
    })
});

route.get('/author/', authorize(roles.author), function(req, res, next) {
    console.log(req.user.sub);
    News.getByAuthor(req.user.sub, function(err, list) {
        if (err) {
            throw err;
        }
        res.json(list);
    })
});

route.post('/', authorize([roles.admin, roles.author]), function(req, res, next) {
    console.log(req.body)
    if (req.body) {
        News.addNews(req.body, function(err, results, fields) {
            if (err) {
                throw err;
            }
            res.json(results.insertId);
        });
    }
});

route.delete('/id/:id?', authorize([roles.admin, roles.author]), function(req, res, next) {
    if (req.params.id) {
        console.log(req.user)
        if (req.user.role == 'Admin') {
            Illustration.remoteImg(req.params.id, function(err, count) {
                if (err) {
                    throw err;
                }
                Comment.remoteComment(req.params.id, function(err, count) {
                    if (err) {
                        throw err;
                    }
                    News.remoteNews(req.params.id, function(err, count) {
                        if (err) {
                            throw err;
                        }
                        res.json(count);
                    });
                });
            });
        } else if (req.user.role == 'Author') {
            News.getById(req.params.id, function(err, result) {
                if (err) {
                    throw err;
                }
                if (result[0].author == req.user.sub) {
                    Illustration.remoteImg(req.params.id, function(err, count) {
                        if (err) {
                            throw err;
                        }
                        Comment.remoteComment(req.params.id, function(err, count) {
                            if (err) {
                                throw err;
                            }
                            News.remoteNews(req.params.id, function(err, count) {
                                if (err) {
                                    throw err;
                                }
                                res.json(count);
                            });
                        });
                    });
                };
            })
        }
    }

});

route.put('/id/:id?', authorize([roles.admin, roles.author]), function(req, res, next) {
    News.updateNews(req.params.id, req.body, function(err, count) {
        if (err) {
            throw err;
        }
        res.json(count);
    })
})