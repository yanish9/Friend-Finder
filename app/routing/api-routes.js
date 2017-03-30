var path = require('path');

var fs = require("fs");

// ===============================================================================
// ROUTING
// ===============================================================================


var friends;
module.exports = function(app) {


    friends = require("../data/friends.json");


    app.get('/api/friends', function(req, res) {

        res.json(friends);
    });



    app.post('/api/friends', function(req, res) {


        var friendChosen = calculateCloseFriend(req.body);

        var obj = {
            name: friendChosen.name,
            link: friendChosen.link
        }

        res.json(obj);

        console.log(req.body.scores);

        friends.push(req.body);
        fs.writeFile("app/data/friends.json", JSON.stringify(friends), function(err) {
            if (err) {
                console.log("Friends write error: " + err);
                process.exit(1);
            }
            
        });


    });

    function calculateCloseFriend(person) {

        var current_scores = person.scores;
        var closest = 100;
        var position;


        for (var i = 0; i < friends.length; i++) {
            var total = 0;

            for (var j = 0; j < friends[i].scores.length; j++) {

                var dif = Math.abs(friends[i].scores[j] - current_scores[j]);
                total += dif;

            }
            console.log(total);
            if (total < closest) {
                closest = total;
                position = i;
            }


        }

        return friends[position];



    }


}