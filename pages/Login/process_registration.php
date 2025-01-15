<?php
// Ensure the form is submitted via POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve form data
    $name = $_POST['name'];
    $mc_username = $_POST['mc_username'];
    $discord_username = $_POST['discord_username'];
    $microsoft_email = $_POST['microsoft_email'];
    $password = $_POST['password'];
    $country_location = $_POST['country_location'];

    // Hash the password using bcrypt
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // For demonstration, we will print the hashed password.
    // Normally, you would save these details to a database.
    echo "Registration successful!<br><br>";
    echo "Full Name: $name<br>";
    echo "Minecraft Username: $mc_username<br>";
    echo "Discord Username: $discord_username<br>";
    echo "Microsoft Email: $microsoft_email<br>";
    echo "Country Location: $country_location<br>";
    echo "Hashed Password: $hashed_password<br>";

    // You would save these details (including the hashed password) to your database here.

} else {
    // Redirect to the registration form if the form isn't submitted
    header('Location: pages\Login\register.html');
    exit;
}
?>
