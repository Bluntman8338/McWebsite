<?php
$password = "mypassword123"; // Replace with the password you want to hash
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);
echo $hashedPassword;
?>