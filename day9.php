<?php
$fileContents = file_get_contents('inputs/day9.txt');
$lines = explode("\n" , $fileContents );
$extrapolatedValues = [];
//$lines = ["10 13 16 21 30 45"];
foreach ($lines as $line) {
    $numbers = explode(" ", $line);
    $extrapolatedValue = findExtrapolatedValue($numbers);
    $extrapolatedValues[] = $extrapolatedValue;
}
$solution = 0;
foreach ($extrapolatedValues as $value) {
    $solution += $value;
}
echo $solution;

function findExtrapolatedValue($numberArray){
    $arrayIterations = [$numberArray];
    $diffs = [];
    $extrapolatedValueOfNextArray = 0;
    while (!arrayIsAllZeroes($numberArray)) {
        $diffs = [];
        foreach ($numberArray as $index => $number){
            if ($index == 0) {continue;}
            $diffs[] = $numberArray[$index] - $numberArray[$index - 1];
        }
//        print_r($diffs);
        $arrayIterations[] = $diffs;
        $numberArray = $diffs;
    }
    $reversedArrayed = array_reverse($arrayIterations);
//    print_r($reversedArrayed);
    
    foreach ($reversedArrayed as $index => $array) {
        if ($index != sizeof($reversedArrayed) -1){
            $extrapolatedValueOfNextArray = (int)$reversedArrayed[$index +1][0] - $extrapolatedValueOfNextArray; //part 2 required only one line change
//            $extrapolatedValueOfNextArray = (int)end($reversedArrayed[$index +1]) + $extrapolatedValueOfNextArray; //part 1
            $reversedArrayed[$index +1][] = $extrapolatedValueOfNextArray;
        }
    }
//    print_r($reversedArrayed);
    
    return $extrapolatedValueOfNextArray;
}
function arrayIsAllZeroes($numberArray){
    foreach ($numberArray as $index => $number){
        if ( $number != 0 ){
            return false;
        }
    }
    return true;
}
//part 1 1681758908
//part 2 803