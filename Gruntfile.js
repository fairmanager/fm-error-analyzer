module.exports = function( grunt ) {

	// Project configuration.
	grunt.initConfig(
		{
			pkg : grunt.file.readJSON( "bower.json" ),

			jshint : {
				options : {
					jshintrc : true
				},
				src     : {
					src : [
						"src/*.js"
					]
				}
			},

			ngAnnotate : {
				js : {
					src  : "src/<%= pkg.name %>.js",
					dest : "dist/<%= pkg.name %>.js"
				}
			},

			concat : {
				template : {
					src  : [ "dist/<%= pkg.name %>.js", "dist/<%= pkg.name %>.html.js" ],
					dest : "dist/<%= pkg.name %>.tpls.js"
				}
			},

			uglify : {
				js       : {
					src  : "dist/<%= pkg.name %>.js",
					dest : "dist/<%= pkg.name %>.min.js"
				},
				template : {
					src  : "dist/<%= pkg.name %>.tpls.js",
					dest : "dist/<%= pkg.name %>.tpls.min.js"
				}
			},

			watch : {
				files : [ "src/*.js", "dist/demo.html" ],
				tasks : [ "jshint", "copy", "uglify" ]
			},

			"gh-pages" : {
				options : {
					base : "dist"
				},
				src     : [ "**" ]
			}
		}
	);

	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-gh-pages" );
	grunt.loadNpmTasks( "grunt-ng-annotate" );

	grunt.registerTask( "default", [ "jshint", "html2js", "ngAnnotate", "concat", "uglify" ] );
};
