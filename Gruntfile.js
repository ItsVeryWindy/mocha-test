module.exports = function (grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        // banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        //     '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        //     '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        //     '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        //     ' Licensed <%= props.license %> */\n',
        // Task configuration
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                //src: ['lib/mocha test.js'],
                //dest: 'dist/mocha test.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                //src: '<%= concat.dist.dest %>',
                //dest: 'dist/mocha test.min.js'
            }
        },
        jshint: {
            options: {
                node: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    describe: true,
                    it: true,
                    browser: true
                },
                boss: true
            },
            gruntfile: {
                src: 'gruntfile.js'
            },
            tests: {
                src: ['tests/**/*.js']
            }
        },
        mocha: {
            test: {
                src: ['tests/client/index.html'],
                options: {
                    reporter: 'Spec',
                    run: true,
                    log: true,
                    logErrors: true
                    //timeout: 10000
                }
            },
        },
        mochaTest: {
          test: {
            options: {
              reporter: 'spec',
              //captureFile: 'results.txt', // Optionally capture the reporter output to a file
              quiet: false // Optionally suppress output to standard out (defaults to false)
            },
            src: ['tests/server/**/*.js']
          }
        },
        // webdriver: {
        //     local: {
        //         tests: 'tests/selenium/*.js',
        //         options: {
        //             desiredCapabilities: {
        //                 browserName: 'firefox'
        //             }
        //         }
        //     }
        // },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            tests: {
                files: '<%= jshint.tests.src %>',
                tasks: ['jshint:tests', 'mocha']
            }
        },
        bowercopy: {
            options: {
                clean: false
            },
            libs_test: {
                options: {
                    destPrefix: 'tests/client/js/vendor'
                },
                files: {
                    'mocha.js': 'mocha/mocha.js',
                    'chai.js': 'chai/chai.js'
                },
            },
            libs_debug: {
                options: {
                    destPrefix: 'public/js/vendor'
                },
                files: {
                    'knockout.js': 'knockout/dist/knockout.debug.js',
                    'knockout.validation.js': 'knockout-validation/Src/knockout.validation.js'
                },
            },
            libs_release: {
                options: {
                    destPrefix: 'public/js/vendor'
                },
                files: {
                    'knockout.js': 'knockout/dist/knockout.js',
                    'knockout.validation.js': 'knockout-validation/Dist/knockout.validation.js'
                },
            }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-webdriver');
    grunt.loadNpmTasks('grunt-bowercopy');

    // Default task
    grunt.registerTask('default', ['jshint', /*'mocha',*/ 'mochaTest', /*'webdriver',*/ 'concat', 'uglify']);
};
