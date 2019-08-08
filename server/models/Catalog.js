var db = require('../Database/Dbconnection');

var Catalogs = {

    createTable: function() {
        db.query("SELECT COUNT(*) AS amount FROM information_schema.TABLES WHERE (TABLE_SCHEMA = 'demo3') AND (TABLE_NAME = 'Catalogs')", function(err, res) {
            if (err) {
                throw err;
            }
            console.log();
            if (res[0].amount !== 0) {


                console.log('table exists');
                return;
            }
            db.query("CREATE TABLE Catalogs (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), description TEXT, parentId INT, FOREIGN KEY (parentId) REFERENCES Catalogs(id) )", function(err, res) {
                if (err) {
                    throw err;
                }
                if (res) {
                    console.log('table created');
                }
            });
        });
    },

    getListCatalog: function(callback) {
        return db.query("SELECT * FROM Catalogs", callback);
    },

    getChildCatalog: function(id, callback) {
        return db.query("SELECT * FROM Catalogs WHERE parentId = ?", id, callback);
    },

    getRootCatalog: function(callback) {
        return db.query("SELECT * FROM Catalogs WHERE parentId IS NULL", callback);
    },

    search: function(key, callback) {
        return db.query("SELECT * FROM Catalogs WHERE name LIKE ?", '%' + key + '%', callback);
    },

    addCatalog: function(catalog, callback) {
        return db.query("INSERT INTO Catalogs(name, description, parentId) VALUE(?, ?, ?)", [catalog.name, catalog.description, catalog.parentId], callback);
    },

    updateCatalog(id, catalog, callback) {
        return db.query("UPDATE Catalogs SET name = ?, description = ?, parentId = ? WHERE id = ?", [catalog.name, catalog.description, catalog.parentId, id], callback);
    },

    remoteChildCatalog: function(id, callback) {
        return db.query("DELETE FROM Catalogs WHERE parentId = ?", id, callback);
    },

    remoteCatalog: function(id, callback) {
        this.remoteChildCatalog(id, function(err, count) {
            if (err) {
                throw (err);
            }
            return db.query("DELETE FROM Catalogs WHERE id = ?", id, callback);
        })
    }


}

module.exports = Catalogs;