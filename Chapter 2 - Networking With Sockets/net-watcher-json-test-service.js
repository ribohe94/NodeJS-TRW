'use strict'
const
	net = require('net'),
	server = net.createServer(function(connection) {
		//Reporting
		console.log('Subscriber connected.');
		//send the first chunk immediately
		connection.write('{"type":"changed","file":"targ');
		//after one second delay, send the other chunk
		let timer = setTimeout(function(){
			connection.write('et.txt","timestamp":1358175758495}' + "\n");
			connection.end();
		}, 1000);
		//clear timer when the connection ends
		connection.on('end', function(){
			clearTimeout(timer);
			console.log('Subscriber disconnected');
		});
	});
	server.listen(5432, function() {
		console.log('Test Server Listening for subscribers...');
	});

//Console telnet localhost 5432
//node --harmony net-watcher-json-client.js
