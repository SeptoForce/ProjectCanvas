<?php
//GETS TOP 10 USERS
$connection = mysqli_connect("localhost", "root", "", "projectcanvas");

$getAllUsers = "SELECT * FROM users ORDER BY value DESC LIMIT 10";
$allUsers = mysqli_query($connection, $getAllUsers);
$usersJSON = "";

mysqli_close($connection);
foreach($allUsers as $user){
    $usersJSON .= json_encode($user) . ",";
}

echo "[" . substr($usersJSON, 0, -1) . "]";