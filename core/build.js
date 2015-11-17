/*!
 * # Pramia - init
 * https://github.com/ristinolla/pramia/
 *
 *
 * Copyright 2015 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

'use strict';
var _ = require('lodash'),
		mkdirp = require('mkdirp'),
		fs = require('fs'),
		mustache = require('mustache'),
		jade = require('jade'),
		Utils	= require('./Utils.js'),
		markdown = require( "markdown" ).markdown;

var config = Utils.getConfigFile();


function build () {
	var options = {
		"name": "perttu"
	};
	var html = jade.renderFile( './core/templates/docs/page.jade', options);
	fs.writeFile( "./" + "page" + '.html', html, function (err) {
	  if (err) throw err;
	  else return;
	});

}


module.exports.build = build;

