//import 'jquery';
var username = localStorage.getItem("u");
var pfp = localStorage.getItem("pfp");
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
            localStorage.setItem("pfp", res.pfp);
            pfp = res.pfp;
            $("body").css('display', 'inline');
            $("html").css('display', 'inline');
            $("#User_Name").html(username);
            $("#User_Image").attr('src', pfp);
            $("#pfp").css('background-size', '100% 100%');
        }
    });
})