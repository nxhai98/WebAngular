const config = require('../config.json');
const jwt = require('jsonwebtoken');
const Role = require('../_helpers/roles');
const Users = require('../models/User');
const bcrypt = require('bcrypt');


Users.createTable();

module.exports = {
    authenticate,
}

async function authenticate(passwd, user) {
    if (bcrypt.compareSync(passwd, user.password)) {
        token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        const { password, ...userPublicInfo } = user; // tach passdw ra khoi tuong thong tin
        return {...userPublicInfo, token };
    }
}