<?php
//GETS INFO ABOUT A CANVAS
session_start();
$userid = $_SESSION['userid'];

$canvasCode = $_REQUEST['canvasCode'];
$connection = mysqli_connect("localhost", "root", "", "projectcanvas");

$userWallet = mysqli_fetch_assoc(mysqli_query($connection, "SELECT * FROM users WHERE id = '$userid'"))['currency'];

//check if canvas exists
$canvasExists = mysqli_query($connection, "SELECT * FROM designs WHERE designcode = '$canvasCode'");
if (mysqli_num_rows($canvasExists) == 0) {
    mysqli_close($connection);
    echo json_encode(array(
        'exists' => 'false',
        'userWallet' => $userWallet+0
    ));
    exit();
}

$canvas = mysqli_fetch_assoc($canvasExists);
$canvasName = $canvas['name'];
$canvasDateOfCreation = $canvas['dateofcreation'];
$canvasDateOfCreation = date("d. m. Y. ", strtotime($canvasDateOfCreation));
$canvasValue = $canvas['value'];
$canvasID = $canvas['id'];

$splittedCanvasCode = str_split($canvasCode,2);
$colorCount = count(array_unique($splittedCanvasCode));

//get canvas creator
$canvasCreatorQuerry = "SELECT * FROM ownershiptransfer LEFT JOIN users ON ownershiptransfer.ownerid = users.id WHERE designid = '$canvasID' ORDER BY ownershiptransfer.date ASC LIMIT 1";
$canvasCreatorResoult = mysqli_fetch_assoc(mysqli_query($connection, $canvasCreatorQuerry));
$canvasCreator = $canvasCreatorResoult['firstname']." ".$canvasCreatorResoult['lastname'];

//get canvas owner
$canvasOwnerQuerry = "SELECT * FROM ownershiptransfer LEFT JOIN users ON ownershiptransfer.ownerid = users.id WHERE designid = '$canvasID' ORDER BY ownershiptransfer.date DESC LIMIT 1";
$canvasOwnerResoult = mysqli_fetch_assoc(mysqli_query($connection, $canvasOwnerQuerry));
$canvasOwner = $canvasOwnerResoult['firstname']." ".$canvasOwnerResoult['lastname'];

$rank = mysqli_num_rows(mysqli_query($connection, "SELECT * FROM designs WHERE value > '$canvasValue'"))+1;

mysqli_close($connection);
echo json_encode(array(
    'exists' => 'true',
    'userWallet' => $userWallet +0,
    'userOwnsCanvas' => $userid == $canvasOwnerResoult['ownerID'] ? 'true' : 'false',
    'name' => $canvasName,
    'originalCreator' => $canvasCreator,
    'originalCreatorUsername' => $canvasCreatorResoult['username'],
    'currentOwner' => $canvasOwner,
    'currentOwnerUsername' => $canvasOwnerResoult['username'],
    'creationDate' => $canvasDateOfCreation,
    'canvasValue' => number_format($canvasValue, 0, '.', ','),
    'rank' => $rank,
    'price' => ceil($canvasValue),
));