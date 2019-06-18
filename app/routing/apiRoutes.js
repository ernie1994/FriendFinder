
var friends = require("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", (req, res) => {
        res.json(friends);
    });

    app.post("/api/friends", (req, res) => {
        var name = req.body.name;
        var photo = req.body.photo;
        var scores = req.body.scores;

        var friend = {
            name: name,
            photo: photo,
            scores: scores
        };
        friends.push(friend);


        var matchDiff;
        var match = {};

        friends.forEach(fr => {

            var totalDifference = 0;

            for (var i = 0; i < scores.length; i++) {
                totalDifference += Math.abs(scores[i] - fr.scores[i]);
            }

            if ((!matchDiff || totalDifference < matchDiff) && name != fr.name) {
                match = fr;
            }
        });

        res.json(match);



    });

};