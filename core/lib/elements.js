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
		async	= require('async'),
		mkdirp = require('mkdirp'),
		fs = require('fs'),
		chalk = require('chalk'),
		path = require('path'),
		recursive = require('recursive-readdir'),
		Utils	= require('./utils.js');

var config = Utils.getConfigFile();



/**
* @name createElement 
* @description createsElement from configPath
* @author Perttu Ristimella
* @param {String} - path to the congif file, relative to execute folder.
* @returns {Object} Object of element
*/
function createElement( configPath ) {
	var config, configFile;
	
	if(typeof configPath !== "string" ) return;
	
	try {
		configFile = fs.readFileSync("./" + configPath, "utf8");
	} catch(err) {
		if(err.code === "ENOENT") throw false;
		else throw err;
		return;
	}
	config = JSON.parse(configFile);
	return _.merge( config, { path: configPath });
}

/**
* @name filterConfigs 
* @description filter configuration files
* @author Perttu Ristimella
* @param {Array} - files is array of files 
* @returns {Array} Array of files that are config files
*/
function filterConfigs( files ) {
	var configs = [];
	for (var i = 0; i < files.length; i++) {
		if( files[i].indexOf('.config.json') !== -1 ) configs.push(files[i]);
	}
	return configs;
}


/**
* @name createGetElementsFunction 
* @description creates function that generates elements for given element type
* @author Perttu Ristimella
* @param {String} - type is the element type, defined in the pramia.json
* @returns {Function}
*/
function createGetElementsFunction( type ){
	return function( callback ) {
		var elements = [];
		console.log(chalk.blue("[Progress]" + " Getting elements from type: " + type));
		recursive(config.paths.dist + "/" + type, [], function (err, files) {
		  files = filterConfigs(files);
		  for (var i = 0; i < files.length; i++) {
		  	elements.push( createElement( files[i] ));
		  }
		  callback(err, elements);
		});
	};
}




/**
* @name getElements 
* @description exports a object with elements as an object, with types from cofig
*     {
* 			"type_1":{
* 				"elements": [
* 					{
* 						"name": "component",
* 						"path": "dist/type_1/component/",
* 						"config": << theConfigFile >>
* 					},
* 					{ ... },
* 					{ ... }
* 				],
* 				"path": ""
* 			},
* 			"type_2": {...},
* 			"type_3": {...}
* 		}
* @author Perttu Ristimella
* @param :none / use 'param' -snippet 
* @returns {Number/Obj/Array/String/Person}
*/
function getAllElements( callback ) {
	var elements = {};
	var types = config.types;
	
	for (var i = 0; i < types.length; i++) {
		elements[types[i]] = createGetElementsFunction(types[i]);
	}
	async.parallel(elements, function(err, results ) {
		callback(err, results);
	});
}


module.exports.getAllElements = getAllElements;
module.exports.createElement = createElement;