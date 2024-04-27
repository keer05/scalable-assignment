function search() {
    var bookingId = document.getElementById("bookingId").value;
    if (bookingId.trim() === "") {
        alert("Please enter a Booking ID.");
        return;
    }

    // Make API call
    $.ajax({
        url: "http://0.0.0.0:8000/travel/itinerary",
        type: "GET",
        data: {
            bookingId: bookingId
        },
        success: function(response) {
            // Sample response handling
            displayTransactionDetails(response);
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
            alert("Failed to fetch transaction details. Please try again later.");
        }
    });
}

function displayTransactionDetails(transaction) {
    // Here, you can parse the transaction object and display the details in #transactionDetails element
    var transactionDetailsElement = document.getElementById("transactionDetails");
    transactionDetailsElement.innerHTML = ""; // Clear previous details
    // Example: Displaying booking ID
    var bookingIdParagraph = document.createElement("p");
    bookingIdParagraph.textContent = "Booking ID: " + transaction.bookingId;
    transactionDetailsElement.appendChild(bookingIdParagraph);
    // Add more details as needed
}
