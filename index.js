#! /usr/bin/env node
(function(){

	'use strict';


	var config,
			_ = require('lodash'),
			exec = require('child_process').exec,
			chalk = require('chalk'),
			Utils = require('./core/utils.js');

	var args = process.argv.slice(2);

	// CHECK IF FILE EXISTS
	if( _.first(args) !== "init" && !Utils.hasConfigFile() ){
		console.log( chalk.bold.red("[Error]") + " Please run " + chalk.green("pramia init") + " first.");
		return;
	} else {
		config = Utils.getConfigFile();
	}

	var add = require('./core/add.js'),
			init = require('./core/init.js');
	

	switch ( _.first(args) ){
		case 'add':
			add.add(args);
			break;
		case 'build':
			console.log('pramia --help');
			break;
		case 'init':
			if(Utils.hasConfigFile()){
				console.log( chalk.bold.red("[Error]") + " Can't init twice, please edit " + chalk.bold("pramia.json") + ".");
				return;
			} else {
				init.doInit();
			}
			break;
		default: 
			console.log('pramia --help');

	}


})();