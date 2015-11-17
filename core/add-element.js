(function( ) {
	'use strict';
	var _ 						= require('lodash'),
			mkdirp 				= require('mkdirp'),
			fs 						= require('fs'),
			mustache 			= require('mustache'),
			Utils				 	= require('./Utils.js'),
			config 				= require('../config.json');

	var paths = config.paths;
	var ORIG_CWD = process.cwd();

	var elementName, elementType;

	module.exports.add = function( args ) {
		elementType = args[1];
		elementName = args[2];
		if( _.indexOf( config.types, elementType) === -1){
			console.log("Element Type not speficied: \n   pramia --help");
			return;
		}
		generateFolder();
	};



	function generateFolder() {
		Utils.createDirectory(elementName, elementType, function( err, dir ) {
			if(dir) makeFiles( dir );
		 	else console.log("FAILED!");
		});
	}




	/**
	* @name makeFiles 
	* @description write properly
	* @author Perttu Ristimella
	* @param {String} - dir to save files to
	* @returns {Number/Obj/Array/String/Person}
	*/
	function makeFiles( dir ) {
		var generateConfig = new Promise(function(resolve, reject) { 
			console.log("generateConfig");
			var output = mustache.render(Utils.getConfigTemplate(), { name: elementName });
			fs.writeFile( dir + "/" +elementName + '.config.json', output, function (err) {
			  if (err) reject(err);
			  resolve();
			});
		});

		var generateDocs = new Promise(function(resolve, reject) { 
			console.log("generateDocs");
			var output = mustache.render(Utils.getDocsTemplate(), { name: elementName });
			fs.writeFile( dir + "/" +elementName + '.doc.md', output, function (err) {
			  if (err) reject(err);
			  resolve();
			});
		});

		var generateJade = new Promise(function(resolve, reject) { 
			console.log("sss");
			var output = mustache.render(Utils.getJadeTemplate(), { name: elementName });
			fs.writeFile( dir + "/" +elementName + '.dom.jade', output, function (err) {
			  if (err) reject(err);
			  resolve();
			});
		});

		var files = [generateConfig, generateJade];
		if( docs ) parts.push(generateDocs);
		//if( script ) parts.push(generateScript);


		Promise.all([generateConfig, generateDocs, generateJade])
			.then(function(values) { 
			  console.log(values); // [3, 1337, "foo"] 
			});
	}


})();