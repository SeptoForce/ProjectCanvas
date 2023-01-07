<?php
//php file for logging in users
$connect = mysqli_connect("localhost", "root", "", "projectcanvas");

if(isset($_POST['login_email']) && isset($_POST['login_password'])){
    $email = $_POST['login_email'];
    $password = $_POST['login_password'];
    $query = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
    $result = mysqli_query($connect, $query);
    if(mysqli_num_rows($result) > 0){
        $row = mysqli_fetch_assoc($result);
        session_start();
        $_SESSION['userid'] = $row['id'];
        $_SESSION['email'] = $row['email'];
        $_SESSION['firstName'] = $row['firstname'];
        $_SESSION['lastName'] = $row['lastname'];
        $_SESSION['username'] = $row['username'];
        $_SESSION['currency'] = $row['currency'];
        $_SESSION['value'] = $row['value'];

        mysqli_close($connect);
        header("Location: pages/home.php");
    }
    else{
        mysqli_close($connect);
        echo "Wrong email or password";
    }
}