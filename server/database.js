const Mongo = require('mongodb').MongoClient;
const tokenizer = require('./token.js');
const usernameChecker = require('./username_restrictions.js');
const identifier = "noobchat";

module.exports =
{
    login: async (acc) =>
    {
        var Database = (await Mongo.connect(process.env.DATABASE_KEY, {useUnifiedTopology: true})).db(process.env.DB);
        var validUsername = usernameChecker.check(acc.username);
        if (validUsername != true) return {authenticated: false};
        var res = await Database.collection(acc.username.toLowerCase()).findOne({username: acc.username, password: acc.password});
        return res != null ? 
        {
            authenticated: true,
            username: acc.username,
            token: res.token,
            pfp: res.pfp
        } :
        {
            authenticated: false
        };
    },

    register: async (acc) =>
    {
        var Database = (await Mongo.connect(process.env.DATABASE_KEY, {useUnifiedTopology: true})).db(process.env.DB);
        var validUsername = usernameChecker.check(acc.username);
        if (validUsername != true)
        {
            var info =
            {
                authenticated: false,
                error: validUsername
            };
            return info;
        }
        if (validUsername == true)
        {
            var accountInfo = (await Database.collection(acc.username.toLowerCase()).findOne({identifier: identifier}));
            if (!accountInfo && validUsername === true)
            {
                var token = tokenizer.createToken();
                await Database.createCollection(acc.username.toLowerCase());
                await Database.collection(acc.username.toLowerCase()).insertOne(
                {
                    username: acc.username,
                    password: acc.password,
                    pfp: "/images/logo.png",
                    token: token,
                    identifier: identifier
                });
                console.log("Account created: " + acc.username);
                return {
                    authenticated: true,
                }
            }
            else
            {
                if (validUsername == true) return {
                    authenticated: false,
                    error: 'Username is taken: ' + acc.username
                };
            }
        }
    },

    find: async (username, token) =>
    {
        var Database = (await Mongo.connect(process.env.DATABASE_KEY, {useUnifiedTopology: true})).db(process.env.DB);
        var result = await Database.collection(username.toLowerCase()).findOne({username: username, token: token});
        return result != null;
    },
    publicFind: async(username) =>
    {
        var Database = (await Mongo.connect(process.env.DATABASE_KEY, {useUnifiedTopology: true})).db(process.env.DB);
        var result = await Database.collection(username.toLowerCase()).findOne({identifier: identifier});
        return result != null;
    },
    updatePfp: async (username, token, pfp) =>
    {
        var Database = (await Mongo.connect(process.env.DATABASE_KEY, {useUnifiedTopology: true})).db(process.env.DB);
        Database.collection(username.toLowerCase()).updateOne(
            {username: username},
            {$set: {"pfp": pfp}},
        )
    },
    get: async (acc) =>
    {
        var Database = (await Mongo.connect(process.env.DATABASE_KEY, {useUnifiedTopology: true})).db(process.env.DB);
        return (await Database.collection(acc.username.toLowerCase()).findOne({username: acc.username, token: acc.token}));
    },
    publicGet: async (username) =>
    {
        var Database = (await Mongo.connect(process.env.DATABASE_KEY, {useUnifiedTopology: true})).db(process.env.DB);
        return (await Database.collection(username.toLowerCase()).findOne({identifier: identifier}));
    }
}

