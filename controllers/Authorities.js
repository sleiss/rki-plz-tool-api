'use strict';

var utils = require('../utils/writer.js');
var Authorities = require('../service/AuthoritiesService');

module.exports.getAuthority = function getAuthority (req, res, next, plz) {
  Authorities.getAuthority(plz)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
