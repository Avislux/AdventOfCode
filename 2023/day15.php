<?php
$fileContents = file_get_contents('inputs/day15.txt');
$words = explode(',',$fileContents);
$hashMap = createLabelMap($words);
print_r($hashMap);
$boxArray = [];
foreach ($words as $word){
    $label = getLabel($word);
    $boxNumber = $hashMap[$label];
    if (str_contains($word, '=')){
        $characters = str_split($word);
        $lensFocalLength = end($characters);
        $boxArray[$boxNumber][$label] = $lensFocalLength;
    } else {
        unset($boxArray[$boxNumber][$label]);
    }
}
//print_r($boxArray);
$focusingPower = 0;
foreach ($boxArray as $boxNumber => $box){
    $position = 1;
    foreach ($box as $label => $lens) {
        $focusingPower += (1+ $boxNumber) *$position * $lens;
        $position++;
    }
}
echo $focusingPower;
//part1($words);

function part1($words) {
    $sum = 0;
    $map = [];
    foreach ($words as $word){
        $characters = str_split($word);
        $currentValue = 0;
        foreach ($characters as $char){
            $currentValue += ord($char);
            $currentValue *= 17;
            $currentValue = $currentValue % 256;
        }
        $sum+=$currentValue;
        $map[$word] = $currentValue;
    }
    echo $sum;
//    return $map;

}
function createLabelMap($words){
    $map = [];
    foreach ($words as $word){
        $label = getLabel($word);
        $characters = str_split($label);
        $currentValue = 0;
        foreach ($characters as $char){
            $currentValue += ord($char);
            $currentValue *= 17;
            $currentValue = $currentValue % 256;
        }
        $map[$label] = $currentValue;
    }
    return $map;
}
function getLabel($word){
    $match = null;
    preg_match('/[a-z]*/',$word,$matches);
    $label = $matches[0];
    return $label;
}
//part 1 279470