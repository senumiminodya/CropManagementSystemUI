$(document).ready(function (){
    console.log("jQuery is loaded and the document is ready");
    var baseURL = "http://localhost:5050/cropManagementSystem/api/v1/health";
    $.ajax({
        url: baseURL, // Replace the port if different
        method: "GET",
        dataType: 'json',
        success: function (response) {
            console.log("Success: ", response);
            alert(response); // Displays the response in an alert box
        },
        error: function (xhr, status, error) {
            console.error("Error: ", xhr.responseText);
            alert("Error: " + xhr.responseText); // Alerts the error if any
        }
    });
})