#!/usr/bin/env node

const { program } = require( 'commander' );

async function listFiles( path, recursive = false ) {
	const fs = require( 'fs' );
	let files;

	// TODO: build each entry as an object, with type either "Directory", "File", "SymLink"
	// and a key named Contents with its contents. Recursive structure.

	// This will only grab the contents of a directory, not the directory itself
	try {
		console.log( `Scanning directory '${ path }' ...` );
		files = fs.readdirSync( path );
	} catch( err ) {
		return console.log( err );
	}

	// Iterate on the list and if directory + recursive is toggled, recurse
	// If recursive flag was passed, delve deep into directories
	if ( recursive ) {
		files.map( async file => {
			if( fs.statSync( `${ path }/${ file }` ).isDirectory() ) {
				return file.siblings = await listFiles( `${ path }/${ file }`, recursive );
			}
		} );
	}
	return files;
}

program
	.arguments( '<dir>' )
	.option( '-r, --recursive', 'Recursive' )
  	.option( '-f, --format <JSON/XML>', 'Output format' )
	.option( '-o, --outfile <filename>', 'Save output into a file' )
	.action( async ( dir, options ) => {
		console.log( await listFiles( dir, options.recursive ) );
	} );

program.parse( process.argv );
