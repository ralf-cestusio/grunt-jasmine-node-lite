/*
 * grunt-jasmine-node-lite
 * https://github.com/magicmoose/grunt-jasmine-node-lite
 *
 * Copyright (c) 2013 Ralf Mueller
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('jasmine_node_lite', 'runs jasmine-node-lite', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            consoleReporter: false,
            showStackTrace: false
        });

        // Tell grunt this task is asynchronous.
        var done = this.async();

        // call jasmine-node-lite
        var jasmineNodeLite = require('jasmine-node-lite');

        function onDone() {
            done();
        }
        var jasmineNodeLiteOptions = {
            genericReporter: jasmineNodeLite.GenericJasmineReporter,
            includeStackTrace: false
        };

        var reporter = new jasmineNodeLite.ConsoleReporter(jasmineNodeLiteOptions);

        jasmineNodeLite.executeSpecs(this.filesSrc, onDone);
    });

};