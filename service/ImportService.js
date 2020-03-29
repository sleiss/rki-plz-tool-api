const database = require('../database');
const parser = require('xml2json');
const fs = require('fs');
const path = require('path');

exports.loadData = function() {

    database.clear_authorities();
    database.clear_cities();

    const xmlData = bufferFile('../data/PlzGA.xml');
    const jsonData = JSON.parse(parser.toJson(xmlData));

    for (let ga_Id in jsonData['PlzGA']['GA']) {
        let GA = jsonData['PlzGA']['GA'][ga_Id];
        GA = transformGA(GA);

        database.add_authority(GA);
    }

    for (let city_Id in jsonData['PlzGA']['PLZGa']) {
        let city = jsonData['PlzGA']['PLZGa'][city_Id];
        city = transformCity(city);

        database.add_city(city);
    }

    console.log('Imported all entries!');
};

function bufferFile(relPath) {
    return fs.readFileSync(path.join(__dirname, relPath), 'utf16le');
}

function transformGA(GA) {
    GA.id = GA['Id'];
    delete GA['Id'];
    GA.region = GA['Line1'];
    delete GA['Line1'];
    GA.name = GA['Line2'];
    delete GA['Line2'];
    GA.street = GA['Strasse'];
    delete GA['Strasse'];
    GA.plz = GA['PLZ'];
    delete GA['PLZ'];
    GA.city = GA['Ort'];
    delete GA['Ort'];
    GA.email = GA['EMail'];
    delete GA['EMail'];
    GA.phone = GA['Tel'];
    delete GA['Tel'];
    GA.fax = GA['Fax'];
    delete GA['Fax'];

    delete GA['xmlns'];
    delete GA['Line3'];

    return GA;
}

function transformCity(city) {
    delete city['xmlns'];

    return city;
}
