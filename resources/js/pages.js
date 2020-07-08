var logout = () =>
{
    localStorage.clear();
    window.location.href = '/login';
}
var publicRoom = () =>
{
    window.location.href = '/public';
}
var dashboard = () =>
{
    window.location.href = '/dashboard';
}