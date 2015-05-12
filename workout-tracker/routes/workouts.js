/**
 * Created by Eva on 10-05-2015.
 */


var Workout = require('../models/workout').Workout;

exports.index = function(req, res) {
    Workout.find({}, function(err, docs) {
        if(!err) {
            res.status(200).json({ workouts: docs });
        } else {
            res.status(500).json({ message: err });
        }
    });
}

exports.create = function(req, res) {


    var workout_name = req.body.workout_name; // Name of workout.
    var description = req.body.workout_description; // Description
    var name = req.body.name;

    console.log(req.body.length);
    console.log(workout_name);
    console.log(name);
    console.log(description);

    Workout.findOne({ name: { $regex: new RegExp(workout_name, "i") } },
        function(err, doc) { // Using RegEx - search is case insensitive
            if(!err && !doc) {

                var newWorkout = new Workout();

                newWorkout.name = workout_name;
                newWorkout.description = description;

                newWorkout.save(function(err) {

                    if(!err) {
                        res.status(201).json( {message: "Workout created with name: " + newWorkout.name });
                    } else {
                        res.status(500).json( {message: "Could not create workout Error: " + err});
                    }

                });

            } else if(!err) {

                // User is trying to create a workout with a name that
                // already exists.
                res.status(403).json( {message: "Workout with that name already exists, please update instead of create or create a new workout with a different name."});
            } else {
                res.status(500).json({ message: err});
            }
        });

}