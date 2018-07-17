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

    // Putting Random "Trains" in my DB for Starting Trains
    // database.ref().set({
        // firstTrain: {name: "Space Caravan",
        //     destination: "The Vast Emptyness of Space",
        //     firstTrain: "1200",
        //     frequency: "200000"},

        // secondTrain: {name: "Hippie Run Express",
        //     destination: "California",
        //     firstTrain: "900",
        //     frequency: "45"},

        // lastTrain: {name: "Gentle People Express",
        //     destination: "Saskatewan, Canada",
        //     firstTrain: "800",
        //     frequency: "25"},
    // })
   
    // Writing Random Starting Trains to Page
    // $(".table").append(`<tr><td>${database.ref().firstTrain.name}</td></tr>`)
    

    // Controls Submit Button Function
    $("#submitBtn").on("click", function (event) {
        event.preventDefault();

        name = $("#train-name").val().trim();
        destination = $("#train-destination").val().trim();
        firstTrain = $("#first-train-time").val().trim();
        frequency = $("#train-frequency").val().trim();

        // var firstTimeConverted = moment(firstTrain, "HH:mm");
        // var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // var tRemainder = diffTime % frequency;
        // var tMinutesTillTrain = frequency - tRemainder;
        // var nextTrain = moment().add(tMinutesTillTrain, "minutes")

        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            // nextTrain: nextTrain
        })
    });

    database.ref().on("child_added", function(snapshot) {
        $(".table").append(`<tr><td>${snapshot.val().name}</td><td>${snapshot.val().destination}</td><td>${snapshot.val().frequency}</td><td>${snapshot.val().nextTrain}</td><td></td>`)
    })

})