const important = 
[
    'public',
    'register',
    'login',
    'public',
    'dashboard',
    'getmsg',
    'pfpchange',
    'chats'
]
var test =
{
    check : (username) =>
    {
        if ((username.length > 20) || (username.length < 3))
        {
            return "Username must be 3-20 characters.";
        }
        else if (/[~`!#$%\^&*+ =\-\[\]\\';,/{}|\\":<>\?]/g.test(username))
        {
            return "No symbols or spaces allowed in username";
        }
        else if (important.indexOf(username.toLowerCase()) >= 0)
        {
            return "Username not permitted";
        }
        else {return true};
    }
}
module.exports = test;