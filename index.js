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

    //console.log( options.format );

    //let fs = require('fs');
    //let files = fs.readdirSync(directory);
    //console.log('format: %s directory: %s',
    //var fileTree = [];

    const myList = listFiles( directory );

    console.log( myList );
    
    //var myJSON = JSON.parse(files);
    //console.log(JSON.stringify(fileTree, null, 2));
    //console.log( files );

    }
  );

program.parse( process.argv );



//var cmds = program.commands.map( c => c._name );



/*
.action(function(directory) {
  var fs = require('fs');
  var files = fs.readdirSync(directory);
  //console.log('format: %s directory: %s',
  //  program.format, directory);
  var fileTree = [];
  files.forEach ( function (arrayItem) {
    var fileItem = new Object();
    fileItem.filename = arrayItem;
    fileTree.push( JSON.stringify(fileItem) );
  });
  var myJSON = JSON.parse(fileTree);
  console.log(JSON.stringify(fileTree));

}
*/