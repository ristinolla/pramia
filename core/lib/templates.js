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
		mustache = require('mustache');


var coreTemplatesDir = "./core/templates";

/**
* @name getElementTemplate 
* @description gets jade template
* @author Perttu Ristimella
* @returns {String}
*/
module.exports.getElementTemplate = getElementTemplate;
function getElementTemplate( type ) {
	return fs.readFileSync(coreTemplatesDir + "/element-" + type + ".template", "utf8");
}


/**
* @name getCoreConfigTemplate 
* @description gets core config template
* @author Perttu Ristimella
* @returns {String}
*/
module.exports.getCoreConfigTemplate = getCoreConfigTemplate;
function getCoreConfigTemplate() {
	return fs.readFileSync(coreTemplatesDir + "/core-config.template", "utf8");
}


/**
* @name getJadeTemplate 
* @description gets config template
* @author Perttu Ristimella
* @returns {String}
*/
module.exports.getJadeTemplate = getJadeTemplate;
function getJadeTemplate( file ) {
	return fs.readFileSync(coreTemplatesDir + "/docs/" + file + ".jade.template", "utf8");
}




