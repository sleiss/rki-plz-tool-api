const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://database:27017";
const client = new MongoClient(uri);
const connection = client.connect();

exports.clear_authorities = function () {
    return connection.then(() => {
        const db = client.db('plzTool');
        const coll = db.collection('authorities');
        return coll.deleteMany();
    });
};

exports.clear_cities = function () {
    return connection.then(() => {
        const db = client.db('plzTool');
        const coll = db.collection('cities');
        return coll.deleteMany();
    });
};

exports.find_authority_by_id = function (id) {
    return connection.then(() => {
        const db = client.db('plzTool');
        const coll = db.collection('authorities');
        return coll.findOne({id: id});
    });
};

exports.find_city_by_plz = function (plz) {
    return connection.then(() => {
        const db = client.db('plzTool');
        const coll = db.collection('cities');
        return coll.findOne({PLZ: plz});
    });
};

exports.add_authority = function (authority) {
    return connection.then(() => {
        const db = client.db('plzTool');
        const coll = db.collection('authorities');
        return coll.insertOne(authority);
    });
};

exports.add_city = function (city) {
    return connection.then(() => {
        const db = client.db('plzTool');
        const coll = db.collection('cities');
        return coll.insertOne(city);
    });
};
