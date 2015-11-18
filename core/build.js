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
		Utils	= require('./lib/utils.js'),
		Elements = require('./lib/elements.js'),
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
	Elements.getAllElements(function(err, result ) {
		if(err) throw err;
		else console.log(result); 
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

function formatAndBuildElement () {
	var template = fs.readFileSync(coreTemplatesDir + "/docs/element.jade.template", "utf8");
	var element = {
		"name": "kakka",
		"defaults": {
			"class": "jabadabaduu",
			"ng-click": "click();"
		}
	};
	var jadeReady = mustache.render(template, parseElementForMustache( element ) );
	console.log(jadeReady);
	var options = {};
	var fn = jade.compile( jadeReady, options);
	fs.writeFile( "./publish/" + element.name + '.html', fn(), function (err) {
	  if (err) throw err;
	  else return;
	});
}


module.exports.build = build;

