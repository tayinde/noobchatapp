const routing = require('./routing.js');
const Http = require('http').createServer(routing.app.App);
const IO = require('socket.io')(Http);
const Port = process.env.PORT || 8080;
const dotenv = require('dotenv').config({path: './.env'});

module.exports = {IO: IO}
const SocketHandler = require('./socket');
SocketHandler.init();

routing.init();

Http.listen(Port, () => console.log(`App listening on port ${Port}`));