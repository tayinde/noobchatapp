var username = localStorage.getItem("u");
var token = localStorage.getItem("token") || 404;

$(() =>
{
    $.post("/dashboard", {username: username, token: token}, (res) =>
    {
        if (res == "redirect")
        {
            window.location.href = '/login';
        } else
        {
            $("body").css('display', 'inline');
            $("html").css('display', 'inline');
        }
    });
})