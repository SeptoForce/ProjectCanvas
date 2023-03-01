<?php
//CHANGING PASSWORD FOR THE USER
session_start();
$userid = $_SESSION['userid'];
$newPassword = $_REQUEST['password'];
$connection = mysqli_connect("localhost", "root", "", "projectcanvas");

//update password
mysqli_query($connection, "UPDATE users SET password = '$newPassword' WHERE id = '$userid'");

mysqli_close($connection);

echo json_encode(array("success" => "true"));