"use strict";

describe( "fmErrorAnalyzer", function() {
	var fmErrorAnalyzer;

	beforeEach( module( "fmErrorAnalyzer" ) );

	beforeEach( inject( function( _fmErrorAnalyzer_ ) {
		fmErrorAnalyzer = _fmErrorAnalyzer_;
	} ) );

	it( "exists", function() {
		expect( fmErrorAnalyzer ).to.be.defined;
	} );

	it( "parses generic HTTP error", function() {
		var error = {
			data       : {
				status  : 500,
				message : "relation \"image\" does not exist"
			},
			status     : 500,
			statusText : "Internal Server Error"
		};

		var result = fmErrorAnalyzer.analyze( error );
		expect( result ).to.be.an( "array" ).with.length( 2 );
		expect( result[ 0 ].message ).to.equal( "Internal Server Error (500)" );
		expect( result[ 1 ].message ).to.equal( "relation \"image\" does not exist" );
	} );

	it( "parses more complex error", function() {
		var error = {
			status     : 503,
			statusText : "Service Unavailable",
			data       : {
				error : {
					info    : "The communication with the backend service failed",
					message : "message could not be delivered",
					inner   : {
						address : "127.0.0.1",
						port    : "7333",
						code    : "ECONNREFUSED"
					}
				}
			}
		};

		var result = fmErrorAnalyzer.analyze( error );
		expect( result ).to.be.an( "array" ).with.length( 3 );
		expect( result[ 0 ].message ).to.equal( "Service Unavailable (503)" );
		expect( result[ 1 ].message ).to.equal(
			"The communication with the backend service failed (message could not be delivered)" );
		expect( result[ 2 ].message ).to.equal( "ECONNREFUSED 127.0.0.1:7333" );
	} );

	it( "parses nested errors", function() {
		var error  = {
			error : {
				status  : 403,
				message : "protected entity",
				info    : "oh no!"
			}
		};
		var result = fmErrorAnalyzer.analyze( error );
		expect( result ).to.be.an( "array" ).with.length( 1 );
		expect( result[ 0 ].message ).to.equal( "oh no! (protected entity)" );
	} )
} );
