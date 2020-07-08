module.exports =
{
    createToken: () =>
    {
        var characters = "abcdefghijklmnopqrstuvwxyz".split('').reverse();
        var randomized = "";
        characters.forEach((c) =>
        {
            var randomNum = Math.random();
            if (randomNum < 0.5)
            {
                randomized += (c.charCodeAt(0) * Math.round(Math.random())).toString().split('').reverse().join('');
            }
            else
            {
                randomized += Math.random() > 0.5 ? c.toUpperCase() : c;
            }
        });
        return Math.random() > 0.5 ? randomized : randomized.split('').reverse().join('');
    }
}