//Topics: EventEmitter, Stream, ChildProcess, Buffer
//Resolves issues with problematic JS language features, generaly recommended to use.
"use strict";
//Import module fs
const fs = require('fs'),
//Import module child_process
spawn = require('child_process').spawn,
//Filename equals parameter in position 2
filename = process.argv[2];
//Validates if there's a file
if(!filename) {
  throw Error("A file to watch must be specified!");
}
//Watch function, monitors filename
fs.watch(filename, function(){
  //Spawn's first parameter is the name of the program we wish to execute
  //Spawn's second parameter is an array of command line arguments with flags and filename
  let ls = spawn('ls', ['-lh', filename]), output = '';
  //.on() indicates the placement of a listener for a specified event type
  //We listen for 'data' events because we are intrested in data from the stream
  //Events can send extra information in the form of parameters to the callbacks
  //Data events in particular, pass along a buffer object
  //Each time we get a chunk of data, we append it to our output.
  /*  About Buffers...
    A Buffer is Node's way of representing binary data, it points to a blob of
    memory allocated by Node's native core outside JS's engine. They can't be
    resized and require encoding and decoding to be used as Strings.

    chunk.toString() converts the buffer into a String using Node's defalt
    encoding, it's a slower process than working directly with the buffer.
  */
  ls.stdout.on('data', function(chunk){
    output += chunk.toString();
  });
  /*  On Close...
    When there's  a close event, we split output with whitespaces ans call on
    different positions, containing different file information.
  */
  ls.stdout.on('close', function(){
    let parts = output.split(/\s+/);
    console.dir([parts[0], parts[1], parts[2], parts[3], parts[4], parts[5], parts[6], parts[7], parts[8]]);
  });
});
console.log("Now waching file " + filename + " for changes...");
