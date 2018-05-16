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


program
  .command( 'ls')
  .arguments( '<directory>' )
  .option('-f, --format <JSON/XML>', 'Output format')
  .action( ( directory, options ) => {

    const myList = listFiles( directory );

    console.log( JSON.stringify( myList, null, 2 ) );
    
    }
  );

program.parse( process.argv );
