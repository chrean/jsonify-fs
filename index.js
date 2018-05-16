#!/usr/bin/env node

var program = require('commander');

const listFiles = ( parent, filelist = null ) => {

  const fs = require( 'fs' ), files = fs.readdirSync( parent );

  filelist = filelist || {};
  filelist[ parent ] = filelist[ parent ] || [];
  let fileType = 'file';
  files.forEach( file => {
       
    if ( fs.statSync( parent + '/' + file ).isDirectory() ) {
      
      filelist = listFiles( parent + '/' + file, filelist);
      fileType = 'dir'; 
    } 
    
    const fileObj = { [fileType]: file };
    filelist[ parent ].push( fileObj );
  
  });

  return filelist;
}

const saveFile = ( path, content ) => {
  const fs = require( 'fs');

  fs.writeFile( path, content, (err) => {
    if (err) console.log( 'orrore' ); //throw err;
    console.log('The file has been saved!');
  });

}

program
  .command( 'ls')
  .arguments( '<directory>' )
  .option('-f, --format <JSON/XML>', 'Output format')
  .option('-o, --outfile <filename>', 'Save output into a file')
  .action( ( directory, options ) => {

    const myList = JSON.stringify( listFiles( directory ), null, 2) ;

    // If a valid path is specified, save output on file
    if ( options.outfile ) {
      saveFile( options.outfile, myList );
    }
    
    //console.log( myList );
  });

program.parse( process.argv );
