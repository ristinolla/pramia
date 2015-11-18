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


var _ 						= require('lodash'),
		mkdirp 				= require('mkdirp'),
		fs 						= require('fs'),
		mustache 			= require('mustache'),
		async					= require('async'),
		chalk					= require('chalk'),
		inquirer			= require('inquirer'),
		Utils				 	= require('./lib/utils.js'),
		Templates			= require('./lib/templates.js');

var config = Utils.getConfigFile();

var paths = config.paths;
var ORIG_CWD = process.cwd();
var elementName, elementType;


module.exports.add = function( args ) {
	//elementType = args[1];
	//elementName = args[2];
	//
	//if( _.indexOf( config.types, elementType) === -1){
	//	console.log("Element Type not speficied: \n   pramia --help");
	//	return;
	//}
	askQuestions();
	
};


var questions = [
	{
    type: "list",
    name: "elementType",
    message: "What kind of element you want to create?",
    choices: config.types
  },
  {
	  type: "input",
	  name: "elementName",
	  message: "What is the name of the element?"
	}
];


function askQuestions( ) {
	inquirer.prompt( questions, function( answers ) {
		elementName = answers.elementName;
		elementType = answers.elementType;
		generateFolder();
	});
}

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
	
	function generateConfig(callback) { 
		var template = Templates.getElementTemplate( "config" );
		var output = mustache.render(template, { name: elementName });
		fs.writeFile( dir + "/" + elementName + '.config.json', output, function (err) {
		  if (err) callback(err, null);
		  else callback(null, true);
		});
	}

	function generateDocs(callback) { 
		var output = mustache.render(Templates.getElementTemplate( "doc" ), { name: elementName });
		fs.writeFile( dir + "/" + elementName + '.doc.md', output, function (err) {
		  if (err) callback(err, null);
		  else callback(null, true);
		});
	}

	function generateJade(callback) { 
		var output = mustache.render(Templates.getElementTemplate( "jade" ), { name: elementName });
		fs.writeFile( dir + "/" + elementName + '.dom.jade', output, function (err) {
		  if (err) callback(err, null);
		  else callback(null, true);
		});
	}

	async.parallel({
    docs: generateDocs,
    config: generateConfig,
    jade: generateJade
	},
	function(err, results) {
		console.log( chalk.bold.green("[SUCCESS]") + " '" + elementName + "' was created." )
	});
}