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
		inquirer			= require('inquirer'),
		Utils				 	= require('./lib/utils.js');

var questions = [
	{
	  type: "input",
	  name: "patternLibraryName",
	  message: "What you would like to call your pattern library?"
	},
	{
    type: "list",
    name: "types",
    message: "What kind of elements do you want?",
    choices: [ 
    	"Atom, Component, View",
    	"Atom, Molecule, Organism, Template, Page",
    	"Component, Module, Pattern"
    ],
    filter: stripWords,
  },
   {
	  type: "input",
	  name: "distFolder",
	  message: "Where do you want to output the elements?",
	  default: function () { return "./patterns"; }
	},
  {
	  type: "input",
	  name: "docsFolder",
	  message: "Where do you want to publish the docs?",
	  default: function () { return "./publish"; }
	}
];


function stripWords( val ) {
	val = val.split(", ");
  var elements = [];
  for (var i = 0; i < val.length; i++) {
  	elements.push('\"' + val[i].toLowerCase() + '\"');
  }
  return elements; 
}

function generateConfigFile ( settings ) {
	var output = mustache.render(Utils.getCoreConfigTemplate(), settings);
	fs.writeFile( "./pramia.json", output, function (err) {
	  if (err) throw err;
	  else return;
	});
}

function initialize () {
	var settings = {};
	inquirer.prompt( questions, generateConfigFile);
}


module.exports.doInit = initialize;