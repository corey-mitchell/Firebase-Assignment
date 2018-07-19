// Document Ready Function
$(document).ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAgI2MGgnlwTdpSWs8ZimvYD5NO3U3nV4k",
        authDomain: "database-test-6d0e5.firebaseapp.com",
        databaseURL: "https://database-test-6d0e5.firebaseio.com",
        projectId: "database-test-6d0e5",
        storageBucket: "database-test-6d0e5.appspot.com",
        messagingSenderId: "575282561382"
    };

    firebase.initializeApp(config);

    // Setting Firebase to a Variable
    var database = firebase.database();

    // Creating a Variable Object for Starting Trains so That I Can Populate the Page with Some Random Trains.
    var startingTrains = {
        firstTrain: {name: "Planet Caravan", destination: "The Vast Emptyness of Space", firstTrain: "0000", frequency: "2000"},
        secondTrain: {name: "Hippy Run", destination: "California", firstTrain: "0420", frequency: "15"},
        thirdTrain: {name: "Soul Train", destination: "Funky Town", firstTrain: "1200", frequency: "45"}
    }

    // Set's Database to startingTrains var
    database.ref().update({startingTrains})

    // Updates the Page on Load so That Starting Trains are Displayed on Load
    // Used .once method instead of .on because everytime I would add a new item it would rewrite starting trains to page
    database.ref().once("value", function() {

        // A Work Around for Looping Through the startingTrains Object.
        Object.keys(startingTrains).forEach(function(key) {
            //Moment Time Conversion
            var firstTrainConverted = moment(startingTrains[key].firstTrain, "HH:mm").subtract(1, "years");
            var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
            var frequency = startingTrains[key].frequency
            var tRemainder = diffTime % frequency;
            var tMinutesTillTrain = frequency - tRemainder;
            var nextArrival = moment().add(tMinutesTillTrain, "minutes");
            var arrivalTime = moment(nextArrival).format("hh:mm")

            // Writes Starting Trains to Page
            $(".table").append(`<tr><td>${startingTrains[key].name}</td><td>${startingTrains[key].destination}</td><td>${startingTrains[key].frequency}</td><td>${arrivalTime}</td><td>${tMinutesTillTrain}</td>`)
        })
    })


    // Controls Submit Button Function
    $("#submitBtn").on("click", function (event) {
        event.preventDefault();

        // Creating Variables to Reference Input Fields Quicker
        var name = $("#train-name").val().trim();
        var destination = $("#train-destination").val().trim();
        var firstTrain = $("#first-train-time").val().trim();
        var frequency = $("#train-frequency").val().trim();

        // Moment Time Conversion
        var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
        var tRemainder = diffTime % frequency;
        var tMinutesTillTrain = frequency - tRemainder;
        var nextArrival = moment().add(tMinutesTillTrain, "minutes");
        var arrivalTime = moment(nextArrival).format("hh:mm")

        // Pushes Data to DB
        database.ref().update({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            nextTrain: arrivalTime,
            minutesAway: tMinutesTillTrain

        })
   
        // Writes Added Train Elements to Page
        // For some reason, it was adding double items so I used the .once method instead of .on to keep it from duplicating
        database.ref().once("value", function(snapshot) {
            console.log(snapshot.val())
            $(".table").append(`<tr><td>${snapshot.val().name}</td><td>${snapshot.val().destination}</td><td>${snapshot.val().frequency}</td><td>${snapshot.val().nextTrain}</td><td>${snapshot.val().minutesAway}</td>`)
        })
    });

})