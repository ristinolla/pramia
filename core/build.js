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
		async = require('async'),
		mkdirp = require('mkdirp'),
		fs = require('fs'),
		mustache = require('mustache'),
		jade = require('jade'),
		Utils	= require('./lib/utils.js'),
		Elements = require('./lib/elements.js'),
		Docs = require('./lib/docs.js'),
		markdown = require( "markdown" ).markdown;

var config = Utils.getConfigFile();
var coreTemplatesDir = "./core/templates";

function build () {
	var options = {
		"name": "perttu"
	};
	var html = jade.renderFile( './core/templates/docs/page.jade', options);
	fs.writeFile( "./publish/" + "page" + '.html', html, function (err) {
	  if (err) throw err;
	  else return;
	});
	async.waterfall([
    Elements.getAllElements,
    Docs.buildDocs
	], function (err, result) {
	   console.log("err", err); // result now equals 'done' 
	   console.log("result", result);
	});
}


function parseElementForMustache( element ) {
	var parsed = {
		"element": element.name,
	};
	var stringDefaults = [];
	if(element.defaults){
		_.mapKeys(element.defaults, function(value, key) {
		  stringDefaults.push( key + '=\"' + value + '\"');
		});
	}
	parsed.elementDefaults = stringDefaults.join(", ");
	return parsed;
}




module.exports.build = build;

