var db = require('../Database/Dbconnection');


var Comments = {

    createTable: function() {
        db.query("SELECT COUNT(*) AS amount FROM information_schema.TABLES WHERE (TABLE_SCHEMA = 'demo3') AND (TABLE_NAME = 'Comments')", function(err, res) {
            if (err) {
                throw err;
            }
            console.log();
            if (res[0].amount !== 0) {


                console.log('table exists');
                return;
            }
            db.query("CREATE TABLE Comments (id INT AUTO_INCREMENT PRIMARY KEY, userId INT NOT NULL, newsId INT NOT NULL, content TEXT, createAt DATETIME, updateAt DATETIME, parentId INT, FOREIGN KEY (userId) REFERENCES Users(id), FOREIGN KEY (newsId) REFERENCES News(id), FOREIGN KEY (parentId) REFERENCES Comments(id))", function(err, res) {
                if (err) {
                    throw err;
                }
                if (res) {
                    console.log('table created');
                }
            });
        });
    },

    getComments: function(newsId, callback) {
        return db.query("SELECT Comments.id, Comments.userId, Comments.newsID, Comments.content, Comments.createAt, Comments.parentId, Users.userName FROM Comments INNER JOIN Users ON Comments.userId = Users.id WHERE newsId = ? ORDER BY createAt DESC", newsId, callback);
    },

    getChildComments: function(id, callback) {
        return db.query("SELECT * FROM Comments WHERE parentId = ?", id, callback);
    },

    addComment: function(comment, callback) {
        return db.query("INSERT INTO Comments(userId, newsId, content, createAt, parentId) VALUE(?, ?, ?, NOW(), ?)", [comment.userId, comment.newsId, comment.content, comment.parentId], callback);
    },

    updateComment(id, content, callback) {
        return db.query("UPDATE Comments SET content = ? WHERE id = ?", [content, id], callback);
    },

    remoteChildComment: function(id, callback) {
        return db.query("DELETE FROM Comments WHERE (newsId = ?) AND (parentId IS NOT NULL)", [id], callback);
    },
    remoteComment: function(id, callback) {
        this.remoteChildComment(id, function(err, count) {
            if (err) {
                throw err;
            }
            console.log('aaa');
            return db.query("DELETE FROM Comments WHERE newsId = ? AND parentId IS NULL", [id], callback);
        })
    }

}

module.exports = Comments;