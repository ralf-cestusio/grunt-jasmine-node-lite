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
    var CONSOLEREPORTEROPTIONS = {
        enabled: false,
        stackTrace: false
    };

    var JASMINEOPTIONS = {
        specs: []
    };

    grunt.registerMultiTask('jasmine_node_lite', 'runs jasmine-node-lite', function() {
        // Merge task-specific and/or target-specific options with these defaults.

        var options = this.options({
            consoleReporter: CONSOLEREPORTEROPTIONS,
            jasmine: JASMINEOPTIONS
        });
        var specFiles = [];
        //resolve specs glob 
        options.jasmine.specs.forEach(function(specItem) {
            if (specItem) {
                specFiles = specFiles.concat(grunt.file.expand({
                    nonull: true
                }, specItem));
            }
        });
        options.jasmine.specs = specFiles;
        
        // Tell grunt this task is asynchronous.
        var done = this.async();

        // call jasmine-node-lite
        var jasmineNodeLite = require('jasmine-node-lite');

        function onConsoleReporterDone() {
            console.log('ConsoleReporter done');
            done();
        }
        if (options.consoleReporter.enabled === true) {
            options.consoleReporter.onComplete = onConsoleReporterDone;
            var consoleReporter = new jasmineNodeLite.ConsoleReporter(options.consoleReporter);
            jasmineNodeLite.registerReporter(consoleReporter);
        }

        jasmineNodeLite.executeSpecs(options.jasmine);
    });

};