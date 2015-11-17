(function( ) {
	'use strict';
	var _ = require('lodash'),
			mkdirp = require('mkdirp'),
			fs = require('fs'),
			mustache = require('mustache'),
			config = require('../config.json');

	var coreTemplatesDir = "./core/templates";
	/**
	* @name createDirectory
	* @description does something awesome
	* @author Perttu Ristimella 
	* @returns {}
	*/
	function createElementDirectory( elementName, elementType, cb ) {
		var dir = [ config.paths.dist, elementType, elementName ].join("/");
		mkdirp(dir, function (err) {
    	if (err) cb(err, null);
    	else cb(null, dir);
		}); 
	}

	
	/**
	* @name getConfigTemplate 
	* @description gets config template
	* @author Perttu Ristimella
	* @returns {String}
	*/
	function getConfigTemplate() {
		return fs.readFileSync(coreTemplatesDir + "/config.mustache", "utf8");
	}

	/**
	* @name getConfigTemplate 
	* @description gets config template
	* @author Perttu Ristimella
	* @returns {String}
	*/
	function getDocsTemplate() {
		return fs.readFileSync(coreTemplatesDir + "/doc.mustache", "utf8");
	}

	/**
	* @name getConfigTemplate 
	* @description gets config template
	* @author Perttu Ristimella
	* @returns {String}
	*/
	function getJadeTemplate() {
		return fs.readFileSync(coreTemplatesDir + "/jade.mustache", "utf8");
	}









	// ===============================
	// #Exports
	// ===============================

	module.exports.createDirectory = createElementDirectory;
	module.exports.getConfigTemplate = getConfigTemplate;
	module.exports.getDocsTemplate = getDocsTemplate;
	module.exports.getJadeTemplate = getJadeTemplate;


})();