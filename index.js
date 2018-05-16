#!/usr/bin/env node

var program = require('commander');

const listFiles = ( dir, filelist ) => {
  const fs = require( 'fs' ), files = fs.readdirSync( dir );

  filelist = filelist || [];
  files.forEach( file => {
       
    if ( fs.statSync(dir + '/' + file ).isDirectory() ) {
            
      filelist = listFiles( dir + '/' + file + '/', filelist);
      
    } else {
      filelist.push( file );
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
