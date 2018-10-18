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

    // Writes Train Elements to Page on Load
    // Added Another Time Conversion Here so that the next arrival time would update with the page.
    database.ref().on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            // var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            // Moment Time Conversion
            var firstTrainConverted = moment(childData.firstTrain, "HH:mm").subtract(1, "years");
            var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
            var tRemainder = diffTime % childData.frequency;
            var tMinutesTillTrain = childData.frequency - tRemainder;
            var nextArrival = moment().add(tMinutesTillTrain, "minutes");
            var arrivalTime = moment(nextArrival).format("hh:mm A")

        
            $(".table").append(`<tr><td>${childData.name}</td><td>${childData.destination}</td><td>${childData.frequency}</td><td>${arrivalTime}</td><td>${tMinutesTillTrain}</td>`)
        })
    })

    // Controls Submit Button Function
    $("#submitBtn").on("click", function (event) {
        event.preventDefault();

        // Creating Variables Assigned Input Fields
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
        var arrivalTime = moment(nextArrival).format("hh:mm A")

        // Pushes Data to DB
        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            // nextTrain: arrivalTime,
            // minutesAway: tMinutesTillTrain,
            dateAdded: firebase.database.ServerValue.TIMESTAMP

        })
   
        // Writes Added Train to Page
        database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
            var data = snapshot.val();
            $(".table").html(`<tr><td>${data.name}</td><td>${data.destination}</td><td>${data.frequency}</td><td>${arrivalTime}</td><td>${tMinutesTillTrain}</td>`)
        })

        // Resets Form Values
        $("#train-name").val('');
        $("#train-destination").val('');
        $("#first-train-time").val('');
        $("#train-frequency").val('');


    });

})