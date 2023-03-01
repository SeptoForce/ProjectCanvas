<?php
//FINDER CODE FOR LISTING CANVASES
session_start();
$username = $_SESSION['username'];
$sortType = $_REQUEST['sort'];
$filterType = $_REQUEST['filter'];
$minValue = NULL;
$maxValue = NULL;
if(isset($_REQUEST['minValue'])){
    $minValue = $_REQUEST['minValue'];
    if(!is_numeric($minValue)){
        $minValue = NULL;
    }
}
if(isset($_REQUEST['maxValue'])){
    $maxValue = $_REQUEST['maxValue'];
    if(!is_numeric($maxValue)){
        $maxValue = NULL;
    }
}
$connection = mysqli_connect("localhost", "root", "", "projectcanvas");

$qSort = "";
switch($sortType){
    case "newest":
        $qSort = " ORDER BY id DESC";
        break;
    case "oldest":
        $qSort = " ORDER BY id ASC";
        break;
    case "mostValuable":
        $qSort = " ORDER BY value DESC";
        break;
    case "leastValuable":
        $qSort = " ORDER BY value ASC";
        break;
    default:
        $qSort = "";
        break;
}
$qValue = "";
if($minValue != NULL && $maxValue != NULL){
    $qValue = " WHERE value BETWEEN ".$minValue." AND ".$maxValue;
}
else if($minValue != NULL){
    $qValue = " WHERE value >= ".$minValue;
}
else if($maxValue != NULL){
    $qValue = " WHERE value <= ".$maxValue;
}
else{
    $qValue = "";
}

$querry = "SELECT * FROM designs".$qValue.$qSort; //SELECT * FROM designs WHERE value >=/<=/BETWEEN minValue/maxValue ORDER BY value/id ASC/DESC
$result = mysqli_query($connection, $querry);

$selection = array();
while($row = mysqli_fetch_assoc($result)){
    $selection[] = $row;
}
$filteredSelection = array();

foreach($selection as $design){ // LOOP THROUGH ALL CANVASES AND FILTER THEM BASED ON FILTER COLOR
    $designCode = $design['designcode'];
    $letterCount = array();
    for($i = 0; $i < strlen($designCode); $i++){
        $letter = $designCode[$i];
        if(is_numeric($letter)){
            continue;
        }
        if(!isset($letterCount[$letter])){
            $letterCount[$letter] = 1;
        }
        else{
            $letterCount[$letter]++;
        }
    }
    $mostCommonLetters = array();
    $numberOfMostCommonLetters = 0;
    foreach ($letterCount as $letter => $count) {
        if($count > $numberOfMostCommonLetters){
            $mostCommonLetters = array($letter);
            $numberOfMostCommonLetters = $count;
        }
        else if($count == $numberOfMostCommonLetters){
            $mostCommonLetters[] = $letter;
        }
    }

    $mostCommonLetter = "";
    $mostCommonLetterCount = 0;
    foreach($letterCount as $letter => $count){
        if($count > $mostCommonLetterCount){
            $mostCommonLetter = $letter;
            $mostCommonLetterCount = $count;
        }
    }


    if($filterType == "all" || in_array($filterType, $mostCommonLetters)){
        $filteredSelection[] = $design;
    }
}


mysqli_close($connection);

if(count($filteredSelection) == 0){
    echo json_encode(array(
        'success' => 'false'
    ));
    return;
}

echo json_encode(array(
    'success' => 'true',
    'canvases' => $filteredSelection
));