'use strict';
const database = require('../database');


/**
 * get authority for given PLZ
 * Find the according authority for the given PLZ  
 *
 * plz String the PLZ for which the authority should be found
 * returns AuthorityItem
 **/
exports.getAuthority = function(plz) {
  return new Promise(function(resolve, reject) {
    database.find_city_by_plz(plz).then(city => {
        if (city === undefined || city === null) {
            reject(`{"errorMessage": "No city found for given parameter plz (${plz})"}`);
            return;
        }
        database.find_authority_by_id(city.tsId).then( authority => {
                delete authority['_id'];
                resolve(authority);
            }
        )
    });
  });
}

