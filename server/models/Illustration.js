var db = require('../Database/Dbconnection');

var Illustration = {

    createTable: function() {
        db.query("SELECT COUNT(*) AS amount FROM information_schema.TABLES WHERE (TABLE_SCHEMA = 'demo3') AND (TABLE_NAME = 'Illustrations')", function(err, res) {
            if (err) {
                throw err;
            }
            console.log();
            if (res[0].amount !== 0) {


                console.log('table exists');
                return;
            }
            db.query("CREATE TABLE Illustrations (id INT AUTO_INCREMENT PRIMARY KEY, img LONGBLOB, newsId INT, content TEXT, FOREIGN KEY (newsId) REFERENCES News(id))", function(err, res) {
                if (err) {
                    throw err;
                }
                if (res) {
                    console.log('table created');
                }
            });
        });
    },

    getImgByNewId: function(newsId, callback) {
        return db.query("SELECT img FROM Illustrations WHERE newsId = ?", newsId, callback);
    },

    addImg: function(img, callback) {
        return db.query("INSERT INTO Illustrations(img, newsId, content) VALUE(?, ?, ?)", [img.img, img.newsId, img.content], callback);
    },

    updateImg(newsId, img, callback) {
        return db.query("UPDATE Illustrations SET img = ?, content = ? WHERE newsId = ?", [img.img, img.content, newsId], callback);
    },

    remoteImg: function(newId, callback) {
        return db.query("DELETE FROM Illustrations WHERE newsId = ?", newId, callback);
    }



}

module.exports = Illustration;