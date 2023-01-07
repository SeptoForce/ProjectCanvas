<?php
session_start();
$userID = $_SESSION['userid'];

$canvas1ID = $_REQUEST['canvas1'];
$canvas2ID = $_REQUEST['canvas2'];

$connection = mysqli_connect("localhost", "root", "", "projectcanvas");
//get number of canvases not owned by user
$canvasesNotOwned = mysqli_query($connection, "SELECT * FROM designs WHERE id NOT IN (SELECT designid FROM ownershiptransfer WHERE ownerid = '$userID')");
$canvasesNotOwnedCount = mysqli_num_rows($canvasesNotOwned);

//save canvasesNotOwned to array
$canvasesNotOwnedArray = array();
while ($row = mysqli_fetch_assoc($canvasesNotOwned)) {
    $canvasesNotOwnedArray[] = $row;
}

$canvas1 = null;
$canvas2 = null;
//get random canvas from array
while (true) {
    $randomIndex = rand(0, $canvasesNotOwnedCount - 1);
    $canvas1 = $canvasesNotOwnedArray[$randomIndex];
    if ($canvas1['id'] != $canvas1ID && $canvas1['id'] != $canvas2ID) {
        break;
    }
}
while (true) {
    $randomIndex = rand(0, $canvasesNotOwnedCount - 1);
    $canvas2 = $canvasesNotOwnedArray[$randomIndex];
    if ($canvas2['id'] != $canvas1ID && $canvas2['id'] != $canvas2ID && $canvas2['id'] != $canvas1['id']) {
        break;
    }
}

mysqli_close($connection);
echo json_encode(array(
    "success" => true,
    "canvasID1" => $canvas1['id'],
    "canvasID2" => $canvas2['id'],
    "canvasCode1" => $canvas1['designcode'],
    "canvasCode2" => $canvas2['designcode'],
));