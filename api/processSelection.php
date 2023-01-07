<?php
session_start();
$userID = $_SESSION['userid'];
$selectedCanvas = $_REQUEST['selectedCanvas'];

$connection = mysqli_connect("localhost", "root", "", "projectcanvas");
//increase user's currency by 10
mysqli_query($connection, "UPDATE users SET currency = currency + 10 WHERE id = '$userID'");
//increase canvas's value by 5
mysqli_query($connection, "UPDATE designs SET value = value + 5 WHERE id = '$selectedCanvas'");

mysqli_close($connection);
echo json_encode(array(
    "success" => true,
));