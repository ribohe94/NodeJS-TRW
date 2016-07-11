/**
 * [File stream variable]
 */
const fs = require('fs'), stream = fs.createReadStream(process.argv[2]);
/**
 * @param  {data} Receives the strig from file
 */
stream.on('data', function(chunk) {
	process.stdout.write(chunk);
});
/**
 * @param  {error} Node sends an error if necessary
 */
stream.on('error', function(err) {
	process.stdout.write("ERROR: " + err.message + "\n");
});