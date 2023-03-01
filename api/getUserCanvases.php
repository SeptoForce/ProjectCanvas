<?php
//GETS ALL CANVASES OWNED BY THE USER SORTED BY VALUE
$username = $_REQUEST['username'];
$connection = mysqli_connect("localhost", "root", "", "projectcanvas");

$getUsersOwnerships = "SELECT * FROM ownershiptransfer WHERE id IN (SELECT MAX(id) FROM ownershiptransfer GROUP BY designID) and ownershiptransfer.ownerID = (SELECT id FROM users WHERE username = '$username')";
$usersOwnerships = mysqli_query($connection, $getUsersOwnerships);

//get all designs owned by the user
$usersDesigns = array();
foreach($usersOwnerships as $ownership){
    $getDesign = "SELECT * FROM designs WHERE id = $ownership[designID]";
    $design = mysqli_query($connection, $getDesign);
    $design = mysqli_fetch_assoc($design);
    array_push($usersDesigns, $design);
}

usort($usersDesigns, function($a, $b){
    return $b['value'] - $a['value'];
});

mysqli_close($connection);

if(count($usersDesigns) == 0){
    echo json_encode(array(
        'success' => 'false'
    ));
    return;
}

echo json_encode(array(
    'success' => 'true',
    'canvases' => $usersDesigns
));