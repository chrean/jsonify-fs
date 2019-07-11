#!/usr/bin/env node

const program = require('commander');

function listFiles( parent, filelist = null ) {
	const fs = require( 'fs' );
  	const files = fs.readdirSync( parent );

  	filelist = filelist || {};
  	filelist[ parent ] = filelist[ parent ] || [];

  	let fileType = 'file';
  	files.forEach( file => {   
		if ( fs.statSync( `${ parent }/${ file }` ).isDirectory() ) {
			filelist = listFiles( `${ parent }/${ file }`, filelist);
			fileType = 'dir'; 
		} 
		
		const fileObj = { [ fileType ]: file };
		filelist[ parent ].push( fileObj );
	} );

  return filelist;
}

function saveFile( path, content ) {
  	const fs = require( 'fs' );

  	try {
    	fs.writeFileSync( path, content );
  	} catch ( err ) {
    	return console.log( `Error writing file ${ path }: ${ err.message }` ); //throw err;
  	}
  	console.log('The file has been saved!');
}

program
  	.command( 'ls')
  	.arguments( '<directory>' )
  	.option('-f, --format <JSON/XML>', 'Output format')
  	.option('-o, --outfile <filename>', 'Save output into a file')
  	.action( ( directory, options ) => {

    	const myList = JSON.stringify( listFiles( directory ), null, 2) ;

    	// If a valid path is specified, save output on file
    	options.outfile && saveFile( options.outfile, myList );
    
    	options.format && console.log( myList );
  	} );

	if ( ! process.argv.slice( 2 ).length ) {
  		program.help();
	}

program.parse( process.argv );
