/*!
 * # Pramia - docs
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
		async	= require('async'),
		mkdirp = require('mkdirp'),
		fs = require('fs'),
		chalk = require('chalk'),
		path = require('path'),
		jade = require('jade'),
		recursive = require('recursive-readdir'),
		mustache = require('mustache'),
		Utils	= require('./utils.js');

var config = Utils.getConfigFile();
var coreTemplatesDir = "./core/templates";
var elementTypes = config.types;

function buildSingleElement( element ) {
	var template = fs.readFileSync(coreTemplatesDir + "/docs/element.jade.template", "utf8");
	var jadeReady = mustache.render(template, element );
	var options = {};
	var fn = jade.compile( jadeReady, options);
	fs.writeFile( "./publish/" + element.name + '.html', fn(), function (err) {
	  if (err) throw err;
	  else return;
	});
}

function buildElementType ( typeName, elements ) {
	console.log("typeName", typeName);
	for (var i = 0; i < elements.length; i++) {
		buildSingleElement(elements[i]);
	}
	return true;
}

function buildDocs( elements, callback ) {
	
	for (var i = 0; i < elementTypes.length; i++) {
		if( _.has(elements, elementTypes[i])) callback(null, buildElementType( elementTypes[i], elements[elementTypes[i]] ) );
	}
}


module.exports.buildSingleElement = buildSingleElement;
module.exports.buildDocs = buildDocs;