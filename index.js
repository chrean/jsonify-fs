#!/usr/bin/env node

var program = require('commander');

const listFiles = ( parent, filelist = null ) => {

  const fs = require( 'fs' ), files = fs.readdirSync( parent );

  filelist = filelist || {};
  filelist[ parent ] = filelist[ parent ] || [];
  files.forEach( file => {
       
    if ( fs.statSync( parent + '/' + file ).isDirectory() ) {
      
      filelist = listFiles( parent + '/' + file + '/', filelist);
      
    } else {
      filelist[ parent ].push( file );
    }
  
  });

  return filelist;
}


program
  .command( 'ls')
  .arguments( '<directory>' )
  .option('-f, --format <JSON/XML>', 'Output format')
  .action( ( directory, options ) => {

    const myList = listFiles( directory );

    console.log( myList );
    
    }
  );

program.parse( process.argv );
