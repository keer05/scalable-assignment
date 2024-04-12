function searchFlights() {
    // Get input values
    var departureCity = document.getElementById("departureCity").value;
    var destinationCity = document.getElementById("destinationCity").value;
    var departureDate = document.getElementById("departureDate").value;
    
    // Construct request body
    var data = {
        departureCity: departureCity,
        destinationCity: destinationCity,
        departureDate: departureDate
    };
    
    // Send AJAX request to search flights
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5000/flights/search", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Parse response and display flight search results
                var flights = JSON.parse(xhr.responseText);
                displayFlightResults(flights);
            } else {
                // Handle error
                alert("Error: " + xhr.statusText);
            }
        }
    };
    
    xhr.send(JSON.stringify(data));
}

function displayFlightResults(flights) {
    var flightResultsDiv = document.getElementById("flightResults");
    flightResultsDiv.innerHTML = ""; // Clear previous results
    
    // Loop through flights and create HTML elements to display them
    flights.forEach(function(flight) {
        var flightDiv = document.createElement("div");
        flightDiv.innerHTML = "<p>Airline: " + flight.airline + "</p>" +
                              "<p>Departure Time: " + flight.departureTime + "</p>" +
                              "<p>Arrival Time: " + flight.arrivalTime + "</p>" +
                              "<p>Price: " + flight.price + "</p>" +
                              "<button onclick='reserveFlight(\"" + flight.id + "\")'>Reserve</button>";
        flightResultsDiv.appendChild(flightDiv);
    });
}

function reserveFlight(flightId) {
    // Send reservation request to backend
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5000/flights/reserve", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("accessToken")); // Assuming access token is stored in localStorage
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert("Flight reserved successfully!");
            } else {
                // Handle error
                alert("Error: " + xhr.statusText);
            }
        }
    };
    
    xhr.send(JSON.stringify({ flightId: flightId }));
}
