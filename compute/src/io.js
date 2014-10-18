var server = require('http').createServer(),
    io = require('socket.io')(server),
    Log = require('./logger.js');

server.listen(3000, function() {
    Log.info('server listening:', 3000);
});

module.exports = io;
