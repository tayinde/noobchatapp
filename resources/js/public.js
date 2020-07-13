// import io from 'socket.io'; import 'jquery'
$(async () =>
{
    var username = localStorage.getItem("u");
    var token = localStorage.getItem("token") || 404;
    var pfp = localStorage.getItem("pfp");
    var s;
    var socket = io();
    await $.post("/public", {username: username, token: token}, (res) =>
    {
        if (res == "redirect")
        {
            window.location.href = '/login';
        } else
        {
            localStorage.setItem("pfp", res.pfp);
            pfp = res.pfp;
            $("body").css('display', 'inline');
            $("html").css('display', 'inline');
            $("#User_Name").html(username);
            $("#User_Image").attr('src', pfp);
            s = res.s;
        }
    });
    $('#Submit_Message').on('submit', async (e) =>
    {
        e.preventDefault();
        if ($('#Chat_Input').val() && $('#Chat_Input').val().trim())
        {
            var msg = $('#Chat_Input').val();
            $('#Chat_Input').val('');
            socket.emit(s, {username: username, token: token, msg: msg, pfp: pfp});
        }
    })
    
    socket.on(s, (msg, user, msgPfP) => 
    {
        if (msg && msg.trim())
        {
            if (user != username)
            {
                var html = `
                <div id="alignright">
                    <div style="flex:1"></div>
                    <a href="/${user}"><img src="${msgPfP}" id="Chat_Pfp"></a>
                </div>
                <div id="alignright">
                    <div style="flex:1"></div>
                    <p id="Chat_Message_Incoming">${user}: ${msg}</p>
                </div>`
                $('#Chat').append(html);
            }
            else
            {
                var html = `
                <a href="/${user}"><img src="${msgPfP}" id="Chat_Pfp"></a>
                <p id="Chat_Message_Outgoing">${user}: ${msg}</p>`
                $('#Chat').append(html);
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