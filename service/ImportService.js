const database = require('../database');
const parser = require('xml2json');
const fs = require('fs');
const path = require('path');

exports.loadData = function() {

    database.clear_authorities();
    database.clear_cities();

    const xmlData = bufferFile('../data/TransmittingSiteSearchText.xml');
    const jsonData = JSON.parse(parser.toJson(xmlData));

    for (let transmittingSite of jsonData['TransmittingSites']['TransmittingSite']) {
        const ts = transformTransmittingSite(transmittingSite);

        database.find_authority_by_id(ts.id).then(res => {
            if (!res) {
                database.add_authority(ts);
            }
        });

        const plzs = getPlzsForCity(transmittingSite, ts);
        for (const plz of plzs) {
            database.add_city(plz);
        }
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

function transformTransmittingSite(transmittingSite) {
    const output = {};
    output.place = transmittingSite.Place;
    output.phone = transmittingSite.Phone;
    output.department = transmittingSite.Department;
    output.id = transmittingSite.Code;
    output.region = transmittingSite.Name;
    output.fax = transmittingSite.Fax;
    output.email = transmittingSite.Email;
    output.plz = transmittingSite.Postalcode;
    output.street = transmittingSite.Street;

    return output;
}

function getPlzsForCity(transmittingSiteRaw, transmittingSite) {
    const output = [];
    if (!transmittingSiteRaw.SearchText || !isIterable(transmittingSiteRaw.SearchText)) {
        return [];
    }
    for (const entry of transmittingSiteRaw.SearchText) {
        const parsedNumber = Number.parseInt(entry.Value);
        if (parsedNumber && parsedNumber !== '') {
            output.push({PLZ: entry.Value, tsId: transmittingSite.id});
        }
    }

    return output;
}

function transformCity(city) {
    delete city['xmlns'];

    return city;
}

// https://stackoverflow.com/a/32538867/3802758
function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}
