const expressJwt = require('express-jwt');
const { secret } = require('../config.json');
const rol = require('./roles');

module.exports = authorize;

function authorize(roles = []) {
    if (roles === 'string') {
        roles = [roles];
    }
    if (roles === []) {
        roles = [rol.admin, rol.author, rol.user];
    }
    return [
        expressJwt({ secret }),
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                console.log(roles);
                return res.status(401).json({ message: 'Unauthorized' });

            }
            //nguoi dung khong duoc cap quyen truy cap route

            next();
        }
    ];

}