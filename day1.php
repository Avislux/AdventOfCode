<?php

$fileContents = file_get_contents('inputs/day1.txt');
$lines = explode("\n" , $fileContents );
$solution = 0;
$isPart2 = true;
$replaceArray = [
    'oneight',
    'threeight',
    'fiveight',
    'nineight',
    'eightwo',
    'eighthree',
    'sevenine',
    'twone',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
];
$replaceWithArray = [18,38,58,98,82,83,79,21,1,2,3,4,5,6,7,8,9,];
foreach ($lines as $line){
    $firstNumber = $lastNumber = null;
    if ($isPart2){
        $line = str_replace($replaceArray,$replaceWithArray,$line);
//        echo $line . "\n";
    }
    $lineArray = str_split($line);
    foreach( $lineArray as $character ){
        if (is_numeric($character)){
            if (is_null($firstNumber)) {
                $firstNumber = $character;
            }
            $lastNumber = $character;
        }
    }
    $calibrationNumber = $firstNumber . $lastNumber;
    $solution += (int)$calibrationNumber;
}
echo $solution;
//Part 1 56042
//P2 54766?
//with combos at the beginning 55288
//after adding 21 55358 correct!