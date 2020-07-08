// import io from 'socket.io'; import 'jquery'
var username = localStorage.getItem("u");
var token = localStorage.getItem("token") || 404;
var s;
var socket = io();

$(async () =>
{
    await $.post("/public", {username: username, token: token}, (res) =>
    {
        if (res == "redirect")
        {
            window.location.href = '/login';
        } else
        {
            $("body").css('display', 'inline');
            $("html").css('display', 'inline');
            s = res;
        }
    });
    $('#Submit_Message').on('submit', async (e) =>
    {
        e.preventDefault();
        if ($('#Chat_Input').val() && $('#Chat_Input').val().trim())
        {
            var msg = $('#Chat_Input').val();
            $('#Chat_Input').val('');
            socket.emit('chatmsg', {username: username, token: token, msg: msg});
        }
    })
    
    socket.on(s, (msg, user) => 
    {
        if (msg && msg.trim())
        {
            if (user != username)
            {
                $('#Chat').append(`<div style="display: flex;width: 100%;"><div style="flex:1"></div><p id="Chat_Message_Incoming">${user}: ${msg}</p></div>`);
            }
            else
            {
                $('#Chat').append(`<p id="Chat_Message_Outgoing">${user}: ${msg}</p>`);
            }
            $('#Chat')[0].scrollBy({behavior: "smooth", top: $('#Chat')[0].scrollHeight})
        }
    });
    socket.on('unauth', () => 
    {
        localStorage.clear();
        window.location.href = '/login';
    });
})