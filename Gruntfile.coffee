#
# grunt-jasmine-node-lite
# https://github.com/magicmoose/grunt-jasmine-node-lite
#
# Copyright (c) 2013 Ralf Mueller
# Licensed under the MIT license.
#

module.exports = (grunt) ->

    # Package
    # =======

    pkg = require './package.json'

    # Configuration
    # =============
    grunt.initConfig

        # Package
        # -------
        pkg: pkg

        jshint:     
          lib: ['tasks/**/*.js']
          options: 
            jshintrc: '.jshintrc'

        jasmine_node_lite:
          all:
            options:
              consoleReporter: 
                enabled: true, 
                stackTrace: false
              jasmine:
                specs: ['spec/**/*.js']

      

    # Modules
    grunt.loadNpmTasks('grunt-contrib-jshint');

    #Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
    
    #Tasks
    grunt.registerTask('default', ['jshint', 'test']);
    grunt.registerTask('test', ['jasmine_node_lite']);
