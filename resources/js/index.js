//import './jquery'; import io from 'socket.io';
$('#Login_Form').on('submit', (event) =>
{
    event.preventDefault();
    $.post('/login',
    {
        username: $('#Login_Username').val(),
        password: $("#Login_Password").val()
    }, (res) =>
    {
        if (res.authenticated == true)
        {
            localStorage.setItem("u", res.username);
            localStorage.setItem("token", res.token);
            window.location.href = "/dashboard";
        }
        else
        {
            alert("Invalid login");
        }
    });
});