#!/usr/bin/env node

const { program } = require( 'commander' );

async function listFiles( path, recursive = false ) {
	const fs = require( 'fs' );
	const files = [];

	const entity = {};

	// TODO: build each entry as an object, with type either "Directory", "File", "SymLink"
	// and a key named Contents with its contents. Recursive structure.

	// This will only grab the contents of a directory, not the directory itself
	try {
		files.push( fs.readdirSync( path ) );
	} catch( err ) {
		return console.log( err );
	}

	files.map( async file => {
		entity.path = path;
	} );

	// If recursive flag was passed, delve deep into directories
	if ( recursive ) {
		files.map( async file => {
			console.log( file );
			if( fs.statSync( `${ path }/${ file }` ).isDirectory() ) {
				file.siblings = await listFiles( `${ path }/${ file }`, recursive );
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
		await listFiles( dir, options.recursive );
	} );

program.parse( process.argv );
