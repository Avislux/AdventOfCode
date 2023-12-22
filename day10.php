<?php
const VERTICAL = '|';
const HORIZONTAL = '-';
const UP_RIGHT = 'L';
const UP_LEFT = 'J';
const DOWN_LEFT = '7';
const DOWN_RIGHT = 'F';
const START = 'S';

const LEFT = 'left';
const RIGHT = 'right';
const UP = 'up';
const DOWN = 'down';
$fileData = [ 'file' =>'day10.txt','direction' => RIGHT, 'loopSide' => RIGHT ]; //Actual test data
$fileDataAlt = [ 'file' =>'day10.txt','direction' => LEFT, 'loopSide' => LEFT ];

$fileDataTest = [ 'file' =>'day10test.txt','direction' => RIGHT, 'loopSide' => LEFT ]; //Part 2 answer should be 8
$fileDataTestAlt = [ 'file' =>'day10test.txt','direction' => DOWN, 'loopSide' => RIGHT ]; //Part 2 answer should be 8

$fileDataTest1 = [ 'file' =>'day10test1.txt','direction' => LEFT, 'loopSide' => LEFT ]; //part 2 answer should be 10
$fileDataTest1Alt = [ 'file' =>'day10test1.txt','direction' => DOWN, 'loopSide' => RIGHT ]; //part 2 answer should be 10

$fileDataTest3 = [ 'file' =>'day10test3.txt','direction' => DOWN, 'loopSide' => LEFT ]; //part 2 answer should be 4
$fileDataTest3Alt = [ 'file' =>'day10test3.txt','direction' => RIGHT, 'loopSide' => RIGHT ]; //part 2 answer should be 4

$inputToRun = $fileDataAlt ;
$fileContents = file_get_contents($inputToRun['file']);
$nextDirection = $inputToRun['direction'];
$startingSide = $inputToRun['loopSide']; //guess
$printMap = true;
$printDebug = false;
$printPipeOnly = false;

$lines = explode("\r\n" , $fileContents );
$startCoordinate = null;
//Find start and parse coordinates
$coordinates = [];
foreach ($lines as $indexY => $line) {
    $positions = str_split($line,1);
    $coordinates[] = $positions;
    if (in_array(START,$positions)){
        $startIndexX = array_search(START,$positions);
        $startCoordinate = [$startIndexX, $indexY];
    }
}
print_r($startCoordinate);
$loopComplete = false;
$position = $startCoordinate;
$previousPosition = null;
$nextPositionToCheck = null;
$steps = 0 ;

$loopCoords = []; //just the x,y positions
$pathInformation = []; //x,y position plus direction
while(!$loopComplete){
    $pathInfo = $position;
    $pathInfo[] = $nextDirection;
    $loopCoords[] = $position;
    $pathInformation[] = $pathInfo;
    $left = [$position[0] - 1, $position[1]];
    $right = [$position[0] + 1, $position[1]];
    $up = [$position[0], $position[1] - 1];
    $down = [$position[0], $position[1] + 1];
    $directionArray = [
        UP => $up,
        DOWN => $down,
        LEFT => $left,
        RIGHT => $right
    ];
    $nextPositionArray = getNextPosition($position,$nextDirection);
//    echo json_encode($nextPositionArray) . "\n";
    $nextDirection = $nextPositionArray['direction'];
    $position = $nextPositionArray['position'];
    if (empty ($position)){
        exit;
    }
    if (checkPosition($position) == START){
        $steps++;
        echo $steps . " \n";
        echo "Part 1 Solution \n";;
        
        echo $steps / 2 . " \n";;
        $loopComplete = true;
    }
    
    $steps++;
}
//part 2 go through the path and check area in a direction. add coordinate to area 
$areaCoords = [];
$totalArea = 0;
//RIGHT come up with 480
foreach ($pathInformation as $index => $coord) {
    $pipeAtCoord = checkPosition($coord);
    $pipeAtPreviousPosition = $index > 0 ? checkPosition($pathInformation[$index-1]) : null;
    $areaCoordinatesAboveCoord = null;
    $checkOppositeDirection = false;
    //This 180 degree pipe thing is wrong
    if ($startingSide == RIGHT){
        if ( $pipeAtCoord == UP_RIGHT && $pipeAtPreviousPosition == UP_LEFT

        ){
            $checkOppositeDirection = true;
        }
    } elseif ($startingSide == LEFT){
        if ( $pipeAtCoord == DOWN_LEFT && $pipeAtPreviousPosition == DOWN_RIGHT //fixes a case in one of the tests
            || $pipeAtCoord == UP_RIGHT && $pipeAtPreviousPosition == UP_LEFT
        ){
            $checkOppositeDirection = true;
        }
    }
    /* $pipeAtCoord == UP_RIGHT && $pipeAtPreviousPosition == UP_LEFT  //keep this one
    || $pipeAtCoord == DOWN_LEFT && $pipeAtPreviousPosition == DOWN_RIGHT
            || $pipeAtCoord == DOWN_RIGHT && $pipeAtPreviousPosition == UP_RIGHT
            ||$pipeAtCoord == UP_LEFT && $pipeAtPreviousPosition == DOWN_LEFT */
    $areaCoordinatesAboveCoord = calcAreaAboveCoord($coord, $startingSide,$checkOppositeDirection);
    if (!empty($areaCoordinatesAboveCoord) && $printDebug){
        echo "Calculated $coord[0], $coord[1] which is a $pipeAtCoord facing $coord[2] " . json_encode($areaCoordinatesAboveCoord) . " \n";
    }
}
echo json_encode($areaCoords);
echo "\n";
echo "Total area: " . count($areaCoords);
echo "\n";

$map = [];
//clone array for map
foreach ($coordinates as $coordinatePair){
    $map[] = $coordinatePair;
}
if ($printMap){
    /*foreach ($loopCoords as $coord) {
        $coordinates[$coord[1]][$coord[0]] = "X";
    }*/
    foreach ($areaCoords as $coord) {
        $coordinates[$coord[1]][$coord[0]] = "I";
    }
    foreach ( $coordinates as $line ) {
        echo implode($line) . "\n";
    }
}
echo  "\n\n";

if ($printPipeOnly){
    foreach ( $coordinates as $positionY => $line ) {
        foreach ($line as $positionX => $element){
            if ( !in_array([$positionX,$positionY],$loopCoords)){
                $map[$positionY][$positionX] = '.';
            }
        }
    }
    foreach ($map as $line){
        echo implode($line) . "\n";
        
    }
}
function checkPosition($coordinate, $debug = null){
    global $coordinates;
//    print_r($coordinate);
    $value = $coordinates[$coordinate[1]][$coordinate[0]] ?? null;
//    echo $debug . " " . $value . "\n";
    return $value;
}
function coordinatesAreSame($checkedCoordinate, $previousPosition){
//    echo json_encode($checkedCoordinate) . " " . json_encode($previousPosition). "\n";
    if (empty($previousPosition)){
        return false;
    }
    return $checkedCoordinate[0] == $previousPosition[0] && $checkedCoordinate[1] == $previousPosition[1];
}
function getNextPosition($position, $direction){
//    echo "Finding position for " . json_encode($position) . " to the " . $direction . " at " . checkPosition($position) . " ";
    $left = [$position[0] - 1, $position[1]];
    $right = [$position[0] + 1, $position[1]];
    $up = [$position[0], $position[1] - 1];
    $down = [$position[0], $position[1] + 1];
    $nextPositionToCheck = null;
    $nextDirection = null;
    if ($direction == UP ){
        switch (checkPosition($up)){
            case(VERTICAL):
                $nextPositionToCheck = [$position[0], $position[1] - 1];
                $nextDirection = UP;
                break;
            case(DOWN_LEFT):
                $nextPositionToCheck = [$position[0] - 1, $position[1] - 1];
                $nextDirection = LEFT;
                break;
            case(DOWN_RIGHT):
                $nextPositionToCheck = [$position[0] + 1, $position[1] - 1];
                $nextDirection = RIGHT;
                break;
            
        }
        $previousPosition = $position;
        $position = $up;
        
    } elseif ( $direction == DOWN ){
        switch (checkPosition($down)){
            case(VERTICAL):
                $nextPositionToCheck = [$position[0], $position[1] + 1];
                $nextDirection = DOWN;
                break;
            case(UP_LEFT):
                $nextPositionToCheck = [$position[0] - 1, $position[1] + 1];
                $nextDirection = LEFT;
                break;
            case(UP_RIGHT):
                $nextPositionToCheck = [$position[0] + 1, $position[1] - 1];
                $nextDirection = RIGHT;
                break;
            
        }
        $previousPosition = $position;
        $position = $down;

    } elseif ($direction == LEFT ){
        switch (checkPosition($left)){
            case(HORIZONTAL):
                $nextPositionToCheck = [$position[0] - 1, $position[1]];
                $nextDirection = LEFT;
                break;
            case(UP_RIGHT):
                $nextPositionToCheck = [$position[0] - 1, $position[1] - 1];
                $nextDirection = UP;
                break;
            case(DOWN_RIGHT):
                $nextPositionToCheck = [$position[0] - 1, $position[1] + 1];
                $nextDirection = DOWN;
                break;
            
        }
        $previousPosition = $position;
        $position = $left;

    } elseif ($direction == RIGHT ){
        switch (checkPosition($right) ){
            case(HORIZONTAL):
                $nextPositionToCheck = [$position[0] + 1, $position[1]];
                $nextDirection = RIGHT;
                break;
            case(UP_LEFT):
                $nextPositionToCheck = [$position[0] + 1, $position[1] - 1];
                $nextDirection = UP;
                break;
            case(DOWN_LEFT):
                $nextPositionToCheck = [$position[0] + 1, $position[1] + 1];
                $nextDirection = DOWN;
                break;
            
        }
        $previousPosition = $position;
        $position = $right;


        //        echo json_encode($nextPositionToCheck) . "Right\n";
    } else {
        echo "You done goofed";
        exit;
    }
//    echo " Return with " . $nextDirection . " " . json_encode($nextPositionToCheck) . " " . checkPosition($nextPositionToCheck) ."\n";
    
    return ['direction' => $nextDirection, 'position' => $position];
}
function calcAreaAboveCoord($coordinate,$side, $calcOppositeDirection = false){
    global $loopCoords,$coordinates,$areaCoords;
    $compass = [UP,RIGHT,DOWN,LEFT];
    
    $positionX = $coordinate[0];
    $positionY = $coordinate[1];
    $direction = $coordinate[2];
    $calcDirection = null;
    if ($side == 'left'){
        $calcDirectionIndex = array_search($direction,$compass) - 1;
        if ($calcDirectionIndex == -1) {
            $calcDirection = end($compass);
        } else {
            $calcDirection = $compass[$calcDirectionIndex];
        }
    } else {
        $calcDirectionIndex = array_search($direction,$compass) + 1;
        if ($calcDirectionIndex == 4) {
            $calcDirection = $compass[0];
        } else {
            $calcDirection = $compass[$calcDirectionIndex];
        }
    }
    switch($direction){
        case(UP): $oppositeDirection = DOWN; break;
        case(DOWN): $oppositeDirection = UP;break;
        case(LEFT): $oppositeDirection = RIGHT; break;
        case(RIGHT): $oppositeDirection = LEFT;break;
    }
    $wallHit = false;
    $whileLoopIterations = 0;
    $coordsFound = [];

    while(!$wallHit){
        $whileLoopIterations++;
        switch ($calcDirection){
            case (UP):
                $coordinateToCheckIfInArea = [$positionX, $positionY - 1];
                break;
            case (DOWN):
                $coordinateToCheckIfInArea = [$positionX, $positionY + 1];
                break;
            case (LEFT):
                $coordinateToCheckIfInArea = [$positionX - 1, $positionY];
                break;
            case (RIGHT):
                $coordinateToCheckIfInArea = [$positionX + 1, $positionY];
                break;
            default:
                echo "You ded";
                exit;
                break;
        }
        $boundaryHit = $coordinateToCheckIfInArea[0] < 0 || $coordinateToCheckIfInArea[1] < 0 || $coordinateToCheckIfInArea[0] > count($coordinates[0]) -1 || $coordinateToCheckIfInArea[1]  > count($coordinates) -1;
        if (in_array($coordinateToCheckIfInArea,$loopCoords)){
            $wallHit = true;
        } elseif ( $boundaryHit) {
            $wallHit = true;
            //this is wrong, discard the result
            break;
        } else {
            $coordsFound[] = $coordinateToCheckIfInArea;
            if (!in_array($coordinateToCheckIfInArea,$areaCoords)){
                $areaCoords[] = $coordinateToCheckIfInArea;
            }
            $positionX = $coordinateToCheckIfInArea[0];
            $positionY = $coordinateToCheckIfInArea[1];
        }
        if ($whileLoopIterations > 1000){
            echo json_encode($coordinate) . " checking " . $direction . " with value " . json_encode($coordinateToCheckIfInArea); 
            exit;
        }
    }
    if ($calcOppositeDirection){
        $wallHit = false;
        $whileLoopIterations = 0;
        $coordsFound = [];
        while(!$wallHit){
            $whileLoopIterations++;
            switch ($oppositeDirection){
                case (UP):
                    $coordinateToCheckIfInArea = [$positionX, $positionY - 1];
                    break;
                case (DOWN):
                    $coordinateToCheckIfInArea = [$positionX, $positionY + 1];
                    break;
                case (LEFT):
                    $coordinateToCheckIfInArea = [$positionX - 1, $positionY];
                    break;
                case (RIGHT):
                    $coordinateToCheckIfInArea = [$positionX + 1, $positionY];
                    break;
                default:
                    echo "You ded";
                    exit;
                    break;
            }
            $boundaryHit = $coordinateToCheckIfInArea[0] < 0 || $coordinateToCheckIfInArea[1] < 0 || $coordinateToCheckIfInArea[0] > count($coordinates[0]) -1 || $coordinateToCheckIfInArea[1]  > count($coordinates) -1;
            if (in_array($coordinateToCheckIfInArea,$loopCoords)){
                $wallHit = true;
            } elseif ($boundaryHit ) {
                //this is wrong, need to discard the result
                $wallHit = true;
                break;
            } else {
                $coordsFound[] = $coordinateToCheckIfInArea;
                if (!in_array($coordinateToCheckIfInArea,$areaCoords)){
                    $areaCoords[] = $coordinateToCheckIfInArea;
                }
                $positionX = $coordinateToCheckIfInArea[0];
                $positionY = $coordinateToCheckIfInArea[1];
            }
            if ($whileLoopIterations > 100){
                echo "Opposite " . json_encode($coordinate) . " checking " . $direction . " with value " . json_encode($coordinateToCheckIfInArea);
                exit;
            }
        }
    }
    return $coordsFound;
}
//part 1 6882
//part 2 1238 too high
//480 too low
//1195 wrong
// 484 wrong
// Actual answer: 491 
// Lines extruding from the corners aren't counted properly.