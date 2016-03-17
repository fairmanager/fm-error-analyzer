/**
 * Copyright (C) 2016, HARTWIG Communication & Events GmbH & Co. KG
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * Created: 2016-02-29 22:05
 *
 * @author Oliver Salzburg <oliver.salzburg@gmail.com>
 * @copyright Copyright (C) 2016, HARTWIG Communication & Events GmbH & Co. KG
 * @license http://opensource.org/licenses/mit-license.php MIT License
 */

(function() {
	"use strict";

	/* globals angular */

	angular.module( "fmErrorAnalyzer", [] );

	angular
		.module( "fmErrorAnalyzer" )
		.constant( "fmError", FmError )
		.service( "fmErrorAnalyzer", ErrorAnalyzer );

	function ErrorAnalyzer() {
	}

	ErrorAnalyzer.prototype.analyze = function ErrorAnalyzer$analyze( error ) {
		// Most simple case, error is a string.
		if( typeof error === "string" ) {
			return [ new FmError( error ) ];
		}

		if( !error ) {
			return [ new FmError( "" ) ];
		}

		// Start deeper analysis
		var errorMessage = error.name || "";

		if( error.message ) {
			errorMessage = error.message;

		} else if( error.statusText ) {
			errorMessage = error.statusText;
			if( error.status ) {
				errorMessage += " (" + error.status + ")";
			}

		} else if( error.code ) {
			errorMessage = error.code;
			if( error.address ) {
				errorMessage += " " + error.address;
				if( error.port ) {
					errorMessage += ":" + error.port;
				}
			}
		}

		if( error.info ) {
			errorMessage = error.info + ( errorMessage ? (" (" + errorMessage + ")" ) : "" );
		}

		var errorObject = new FmError( errorMessage );
		// Status is not considered a first-level information the user should see.
		// We store it in the error object, but it shouldn't be part of the message.
		if( error.status ) {
			errorObject.status = error.status;
		}

		var errorStack = [ errorObject ];

		if( error.inner ) {
			return errorStack.concat( this.analyze( error.inner ) );
		}
		if( error.data && error.data.error ) {
			return errorStack.concat( this.analyze( error.data.error ) );
		}

		return errorStack;
	};

	function FmError( message ) {
		this.message = message;
	}
})();
