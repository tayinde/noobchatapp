const IO = require('./app').IO;
const database = require('./database');
const secret = require('./routing.js').secret;

var SocketHandler =
{
    sendMsg: (msg, username, pfp) =>
    {
        IO.sockets.emit(secret, msg, username, pfp);
    },
    init: () =>
    {
        IO.on('connection', (socket) =>
        {
            socket.on('chatmsg', async (res) =>
            {
                if (!res.msg || !res.msg.trim()) return null;
                var result = 
                {
                    authenticated: await database.find(res.username, res.token),
                    msg: res.msg.replace(/</g, '&lt;')
                }
                if (result.authenticated == true)
                {
                    SocketHandler.sendMsg(result.msg, res.username, res.pfp);
                } else {socket.emit('unauth')}
            })
        })
    }
}
module.exports = SocketHandler;
