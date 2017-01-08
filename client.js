var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:8080');
var value = require('md5')('SOMREALLYLONGSECRETCODE');

console.log(value);
ws.on('open', function open() {
  ws.send('AUTH|' + value);
  setTimeout(() => ws.send('STATUS'), 250);

	var stdin = process.openStdin();

  stdin.addListener("data", function(d) {
	//console.log(d);
	ws.send(d.toString().trim());
  });
});

ws.on('message', function(data, flags) {
//  console.log(data);
});
