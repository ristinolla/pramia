#! /usr/bin/env node
(function(){

	'use strict';

	var _ = require('lodash'),
			exec = require('child_process').exec,
			addElement = require('./core/add-element.js');


	var args = process.argv.slice(2);

	switch ( _.first(args) ){
		case 'add':
			addElement.add(args);
			break;
		case 'build':
			console.log('pramia --help');
			break;
		default: 
			console.log('pramia --help');

	}


})();