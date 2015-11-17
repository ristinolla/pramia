(function( ) {
	'use strict';
	var _ = require('lodash'),
			mkdirp = require('mkdirp'),
			fs = require('fs'),
			mustache = require('mustache');


	var coreTemplatesDir = "./core/templates";
	/**
	* @name getConfigFile 
	* @description gets the configuration file.
	* @author Perttu Ristimella
	* @param :none / use 'param' -snippet 
	* @returns {Number/Obj/Array/String/Person}
	*/
	function getConfigFile( ) {
		var config;
		try {
			config = require('../pramia.json');
		} catch (err) {
			config = {};
		}
		return config;
	}

	var config = getConfigFile();
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

	/**
	* @name getConfigTemplate 
	* @description gets config template
	* @author Perttu Ristimella
	* @returns {String}
	*/
	function getCoreConfigTemplate() {
		return fs.readFileSync(coreTemplatesDir + "/core-config.mustache", "utf8");
	}

	/**
	* @name hasConfigFile 
	* @description does the project have pramia.json installed
	* @author Perttu Ristimella
	* @returns {Boolean}
	*/
	function hasConfigFile( ) {
		try {
			fs.readFileSync("./pramia.json", "utf8");
		} catch(err) {
			if(err.code === "ENOENT") return false;
			else throw err;
		}
		return true;
	}


	// ===============================
	// #Exports
	// ===============================
	module.exports.getConfigFile = getConfigFile;
	module.exports.hasConfigFile = hasConfigFile;
	module.exports.createDirectory = createElementDirectory;
	module.exports.getConfigTemplate = getConfigTemplate;
	module.exports.getDocsTemplate = getDocsTemplate;
	module.exports.getJadeTemplate = getJadeTemplate;
	module.exports.getCoreConfigTemplate = getCoreConfigTemplate;
	


})();