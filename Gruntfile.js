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

			uglify : {
				js       : {
					src  : "dist/<%= pkg.name %>.js",
					dest : "dist/<%= pkg.name %>.min.js"
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

	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-gh-pages" );
	grunt.loadNpmTasks( "grunt-ng-annotate" );

	grunt.registerTask( "default", [ "jshint", "ngAnnotate", "concat", "uglify" ] );
};
