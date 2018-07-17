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

    // Controls Submit Button Function
    $("#submitBtn").on("click", function (event) {
        event.preventDefault();

        // Creating Variables to Reference Input Fields Quicker
        var name = $("#train-name").val().trim();
        var destination = $("#train-destination").val().trim();
        var firstTrain = $("#first-train-time").val().trim();
        var frequency = $("#train-frequency").val().trim();

        // Time Conversion for Next Train Arrival
        var firstTimeConverted = moment(firstTrain, "HH:mm");
        var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % frequency;
        var tMinutesTillTrain = frequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes")
        var nextArrival = moment(nextTrain).format("hh:mm")

        // Pushes Data to DB
        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            nextTrain: nextArrival
        })
    });

    // Writes Last Added Child Element to Page
    database.ref().on("child_added", function(snapshot) {
        $(".table").append(`<tr><td>${snapshot.val().name}</td><td>${snapshot.val().destination}</td><td>${snapshot.val().frequency}</td><td>${snapshot.val().nextTrain}</td><td></td>`)
    })

})