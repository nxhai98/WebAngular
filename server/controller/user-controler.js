const express = require('express');
const route = express.Router();
const userService = require('../Services/user-sevices');
const roles = require('../_helpers/roles');
const Users = require('../models/User');
const authorize = require('../_helpers/authorize');
const bcrypt = require('bcrypt');

const saltRounds = 10;


module.exports = route;
route.post('/login/', authenticate);
route.get('/admin/users/page/:page?', authorize(roles.admin), getListUser);
route.get('/admin/users/search/:key?', authorize(roles.admin), searchUser);
route.post('/admin/users/', authorize(roles.admin), addUsers);
route.delete('/admin/users/:id?', authorize(roles.admin), deleteUser);
route.put('/admin/users/:id?', authorize([]), updateUser);
route.get('/admin/users/authors/', authorize(roles.admin), getListAuthor);
route.put('/user/password/', authorize([roles.admin, roles.author, roles.user]), changePasswd);
route.get('/user/:id?', authorize([]), getUserById);


function authenticate(req, res, next) {
    Users.getUserByUserName(req.body.userName, function(err, resUser) {
        if (err) {
            throw err;
        }
        userService.authenticate(req.body.passwd, resUser[0])
            .then(user => {
                user ? res.json(user) : res.status(401).json({ message: 'Invalid Username or Passwd' })
            })
            .catch(err => next(err));

    })


}

function getListUser(req, res, next) {
    if (req.params.page) {
        Users.getUsers(req.params.page, function(err, users) {
            if (err) {
                throw err;
            }
            res.json(users);
        })
    } else {
        Users.getUsersCount(function(err, count) {
            if (err) {
                throw err;
            }
            res.json(Math.ceil(count[0].count / 3))
        })
    }

}

function getUserById(req, res, next) {
    if (req.params.id && req.params.id == req.user.sub) {
        Users.getUsersById(req.user.sub, function(err, user) {
            if (err) {
                throw err;
            }
            res.json(user[0]);
        })
    }
}

function addUsers(req, res, next) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            Users.addUsers(req.body, hash, function(err, count) {
                if (err) {
                    throw err;
                }
                res.json();
            })
        });
    });

}

function deleteUser(req, res, next) {
    Users.remoteUser(req.params.id, function(err, count) {
        if (err) { throw err };
        res.json();
    })
}

function updateUser(req, res, next) {
    if (req.user.role === 'Admin') {
        Users.updateUser(req.params.id, req.body, function(err, count) {
            if (err) {
                throw err;
            }
            res.json(count);
        })
    } else if (req.user.sub === req.params.id) {
        Users.updateUser(req.params.id, req.body, function(err, count) {
            if (err) {
                throw err;
            }
            res.json(count);
        })
    }

}

function getListAuthor(req, res, next) {
    Users.getAuthor(function(err, list) {
        if (err) {
            throw err;
        }
        res.json(list);
    })
}

function searchUser(req, res, next) {
    if (req.params.key) {
        Users.searchUser(req.params.key, function(err, list) {
            if (err) {
                throw err;
            } else {
                res.json(list);
            }

        })
    }
}

function changePasswd(req, res, next) {
    Users.getUsersById(req.user.sub, function(err, user) {
        if (err) {
            throw err;
        }
        userService.authenticate(req.body.oldPass, user[0])
            .then(user => {
                if (user) {
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        bcrypt.hash(req.body.newPass, salt, function(err, hash) {
                            Users.changePass(req.user.sub, hash, function(err, count) {
                                res.json(count);
                            });
                        });
                    });
                } else {
                    return res.status(401).json({ message: 'Password Invalid' });
                }
            })
            .catch(err => next(err));
    })
}