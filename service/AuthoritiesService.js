'use strict';


/**
 * get authority for given PLZ
 * Find the according authority for the given PLZ  
 *
 * plz String the PLZ for which the authority should be found
 * returns AuthorityItem
 **/
exports.getAuthority = function(plz) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "city" : "München",
  "phone" : "089 233-96300",
  "street" : "Bayerstraße 28a",
  "name" : "Referat für Gesundheit und Umwelt",
  "id" : "1.09.1.62.",
  "region" : "Landeshauptstadt München",
  "fax" : "089 233-47814",
  "email" : "gs-is-mw.rgu@muenchen.de",
  "plz" : "80335"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

