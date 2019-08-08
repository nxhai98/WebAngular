var db = require('../Database/Dbconnection');


var Users = {

    createTable: function() {
        db.query("SELECT COUNT(*) AS amount FROM information_schema.TABLES WHERE (TABLE_SCHEMA = 'demo3') AND (TABLE_NAME = 'Users')", function(err, res) {
            if (err) {
                throw err;
            }
            console.log();
            if (res[0].amount !== 0) {


                console.log('table exists');
                return;
            }
            db.query("CREATE TABLE Users (id INT AUTO_INCREMENT PRIMARY KEY, userName VARCHAR(255), password VARCHAR(1024), role VARCHAR(255), email VARCHAR(255), fullName VARCHAR(255), gender VARCHAR(255))", function(err, res) {
                if (err) {
                    throw err;
                }
                if (res) {
                    console.log('table created');
                }
            });
        });
    },

    getUsers: function(page, callback) {
        return db.query("SELECT id, userName, role, email, fullName, gender FROM Users LIMIT ?, 3", [(page - 1) * 3], callback);
    },

    getUsersById: function(id, callback) {
        return db.query("SELECT id, userName, role, email, fullName, gender FROM Users WHERE id = ?", id, callback);
    },

    getUsersCount: function(callback) {
        return db.query("SELECT COUNT(*) AS count FROM Users", callback);
    },

    getAuthor: function(callback) {
        return db.query("SELECT id, userName, role, email, fullName, gender FROM Users WHERE   role = 'Author'", callback)
    },

    getUserByUserName: function(userName, callback) {
        return db.query("SELECT * FROM Users WHERE userName = ? ", userName, callback);
    },

    searchUser: function(key, callback) {
        return db.query("SELECT id, userName, role, email, fullName, gender FROM Users WHERE userName LIKE ?", '%' + key + '%', callback)
    },

    addUsers: function(user, hash, callback) {
        return db.query("INSERT INTO Users(userName, password, role, email, fullName, gender) VALUE(?, ?, ?, ?, ?, ?)", [user.userName, hash, user.role, user.email, user.fullName, user.gender], callback);
    },

    updateUser(id, user, callback) {
        return db.query("UPDATE Users SET userName = ?, email = ?, fullName = ?, gender = ? WHERE id = ?", [user.userName, user.email, user.fullName, user.gender, id], callback);
    },

    changePass(id, password, callback) {
        return db.query("UPDATE Users SET password = ? WHERE id = ?", [password, id], callback);
    },

    remoteUser: function(id, callback) {
        return db.query("DELETE FROM Users WHERE id = ?", [id], callback);
    }


}


module.exports = Users;