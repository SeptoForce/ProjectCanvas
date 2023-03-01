<?php
// UPDATES THE VALUE OF ALL USERS
$connection = mysqli_connect("localhost", "root", "", "projectcanvas");

$getAllUsers = "";
if(isset($_REQUEST['allUsers'])){
    if($_REQUEST['allUsers'] == 'true'){
        $getAllUsers = "SELECT * FROM users";
    }else{
        session_start();
        $userID = $_SESSION['userID'];
        $getAllUsers = "SELECT * FROM users WHERE id == $userID";
    }
}
$allUsers = mysqli_query($connection, $getAllUsers);
//get all ownership trasfers but with unique canvas id's, if there are multiple ownership transfers for one canvas, only the latest one will be taken into account
$getAllOwnershipTransfers = "SELECT * FROM ownershiptransfer WHERE id IN (SELECT MAX(id) FROM ownershiptransfer GROUP BY designID)";
$allOwnershipTransfers = mysqli_query($connection, $getAllOwnershipTransfers);
//get all designs and their values
$getAllDesigns = "SELECT * FROM designs";
$allDesigns = mysqli_query($connection, $getAllDesigns);

foreach($allUsers as $user){
    $userID = $user['id'];
    $userValue = 0;
    foreach($allOwnershipTransfers as $ownershipTransfer){
        if($ownershipTransfer['ownerID'] == $userID){
            foreach($allDesigns as $design){
                if($design['id'] == $ownershipTransfer['designID']){
                    $userValue += $design['value'];
                }
            }
        }
    }
    $updateUserValue = "UPDATE users SET value = $userValue WHERE id = $userID";
    mysqli_query($connection, $updateUserValue);
}

mysqli_close($connection);
echo json_encode(array(
    'success' => 'true'
));