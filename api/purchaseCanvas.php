<?php
//PURCHASE CANVAS
session_start();
$userid = $_SESSION['userid'];
$canvasCode = $_REQUEST['canvasCode'];
$canvasName = $_REQUEST['canvasName'];

$connection = mysqli_connect("localhost", "root", "", "projectcanvas");

$userWallet = mysqli_fetch_assoc(mysqli_query($connection, "SELECT * FROM users WHERE id = '$userid'"))['currency'];

$canvasExists = mysqli_query($connection, "SELECT * FROM designs WHERE designcode = '$canvasCode'");

$canvasPrice = 0;
if (mysqli_num_rows($canvasExists) == 0) {
    $splitCanvasCode = str_split($canvasCode, 2);
    $colorCount = count(array_unique($splitCanvasCode));
    $canvasPrice = ceil(500/$colorCount);
    $canvasExists = false;
}else{
    $canvas = mysqli_fetch_assoc($canvasExists);
    $canvasPrice = $canvas['value']*1.1;
    $canvasExists = true;
}

if($userWallet < $canvasPrice){ //CHECK IF USER HAS ENOUGH MONEY
    mysqli_close($connection);
    echo json_encode(array(
        'success' => 'false',
        'failWallet' => 'true',
    ));
    exit();
}else{ //IF USER HAS ENOUGH MONEY, PURCHASE NEW CANVAS OR OWNERSHIP OF EXISTING CANVAS
    if (!$canvasExists) {
        $createCanvasQuerry = "INSERT INTO designs (name, designcode, value) VALUES ('$canvasName', '$canvasCode', '$canvasPrice')";
        $applyCreatorQuerry = "INSERT INTO ownershiptransfer (designid, ownerid, date) VALUES (LAST_INSERT_ID(), '$userid', NOW())";
        mysqli_query($connection, $createCanvasQuerry);
        mysqli_query($connection, $applyCreatorQuerry);
    }else{
        $currentCanvasOwnerQuerry = "SELECT * FROM ownershiptransfer WHERE designid = '$canvas[id]' ORDER BY date DESC LIMIT 1";
        $canvasOwnerResoult = mysqli_fetch_assoc(mysqli_query($connection, $currentCanvasOwnerQuerry))["ownerID"];
        $updateCanvasOwnerQuerry = "INSERT INTO ownershiptransfer (designid, ownerid, sellerid, date) VALUES ('$canvas[id]', '$userid', '$canvasOwnerResoult', NOW())";
        mysqli_query($connection, $updateCanvasOwnerQuerry);
        $updateValueQuerry = "UPDATE designs SET value = '$canvasPrice' WHERE id = '$canvas[id]'";
        mysqli_query($connection, $updateValueQuerry);
    }
    $updateWalletQuerry = "UPDATE users SET currency = currency - '$canvasPrice' WHERE id = '$userid'";
    mysqli_query($connection, $updateWalletQuerry);

    //get value of current user
    $querry = "SELECT * FROM users WHERE id = '$userid'";
    $result = mysqli_query($connection, $querry);
    $user = mysqli_fetch_assoc($result);
    $_SESSION['value'] = $user['value'];

    mysqli_close($connection);
    echo json_encode(array(
        'success' => 'true',
        'failWallet' => 'false',
    ));
}