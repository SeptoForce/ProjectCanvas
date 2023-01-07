<?php
//php file for registering users
$connect = mysqli_connect("localhost", "root", "", "projectcanvas");

if(isset($_POST['register_email']) && isset($_POST['register_password']) && isset($_POST['register_firstName']) && isset($_POST['register_lastName']) && isset($_POST['register_username'])){
    $email = $_POST['register_email'];
    $password = $_POST['register_password'];
    $firstName = $_POST['register_firstName'];
    $lastName = $_POST['register_lastName'];
    $username = $_POST['register_username'];
    //check if email already exists
    $query = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($connect, $query);
    if(mysqli_num_rows($result) > 0){
        echo "Email already exists";
    }
    else{
        $currency = 100;
        $query = "INSERT INTO users (email, password, firstname, lastname, username, currency) VALUES ('$email', '$password', '$firstName', '$lastName', '$username', '$currency')";
        $result = mysqli_query($connect, $query);
        if($result){
            mysqli_close($connection);
            echo "User registered";
        }
        else{
            mysqli_close($connection);
            echo "Error";
        }
    }
}