var test =
{
    check : (username) =>
    {
        if ((username.length > 20) || (username.length < 3))
        {
            return "Username must be 3-20 characters.";
        }
        else if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(username))
        {
            return "No symbols allowed in username";
        }
        else {return true};
    }
}
module.exports = test;