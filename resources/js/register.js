$('#Register_Form').on('submit', (event) =>
{
    event.preventDefault();
    $.post('/register',
    {
        username: $('#Register_Username').val(),
        password: $("#Register_Password").val()
    }, (res) =>
    {
        if (res.authenticated == true)
        {
            window.location.href = '/login?info=created_acc';
        }
        else
        {
            window.alert(res.error);
        }
    });
});