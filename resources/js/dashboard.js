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
            $("body").css('display', 'inline');
            $("html").css('display', 'inline');
            $("#username").html(username);
            $("#User_Name").html(username);
            $("#User_Image").attr('src', pfp);
            $("#pfp").css('background', `url(${pfp})`)
            $("#pfp").css('background-size', '100% 100%');
        }
    });
    $('#pfp').on('click', (e) =>
    {
        e.preventDefault()
        $('#pfp_Form').show();
    })
    $('#pfp_Form').on('submit', (e) =>
    {
        e.preventDefault();
        if ($('#pfp_Input').val() && $('#pfp_Input').val().trim())
        $.post('/pfpChange', {username: username, token: token, pfp: $('#pfp_Input').val()}, () =>
        {
            localStorage.setItem('pfp', $('#pfp_Input').val());
            location.reload();
        })
    })
})