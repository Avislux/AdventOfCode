<?php
//ini_set('memory_limit', '5G' );
$seeds = file_get_contents('inputs/day5_0-seeds.txt');
$seedsToSoil = file_get_contents('inputs/day5_1-seeds-to-soil.txt');
$soilToFert = file_get_contents('inputs/day5_2-seeds-to-fertilizer.txt');
$fertToWater = file_get_contents('inputs/day5_3-fertilizer-to-water.txt');
$waterToLight = file_get_contents('inputs/day5_4-water-to-light.txt');
$lightToTemp = file_get_contents('inputs/day5_5-light-to-temp.txt');
$tempToHumidity = file_get_contents('inputs/day5_6-temp-to-humidity.txt');
$humidityToLocation = file_get_contents('inputs/day5_7-humidity-to-loc.txt');

$startingSeeds = explode(" ", $seeds);
$part2Ranges = array_chunk($startingSeeds, 2);
$seedsToSoilMap = parseMap($seedsToSoil);
$soilToFertMap = parseMap($soilToFert);
$fertToWaterMap = parseMap($fertToWater);
$waterToLightMap = parseMap($waterToLight);
$lightToTempMap = parseMap($lightToTemp);
$tempToHumidityMap = parseMap($tempToHumidity);
$humidityToLocationMap = parseMap($humidityToLocation);
if (false){
    $startingSeeds = [79,14,55,13];
    $part2Ranges = array_chunk($startingSeeds, 2);
    $seedsToSoilMap = [[50,98,2],[52,50,48]];
    $soilToFertMap = [[0,15,37],[37,52,2], [39,0,15]];
    $fertToWaterMap = [[49,53,8],[0,11,42],[42,0,7],[57,7,4]];
    $waterToLightMap = [[88,18,7 ],[18,25,70]];
    $lightToTempMap = [[45,77,23 ],[81,45,19],[68,64,13]];
    $tempToHumidityMap = [[0,69,1],[1,0,69]];
    $humidityToLocationMap = [[60,56,37 ],[56,93,4]];
}
$allMaps = [$seedsToSoilMap,$soilToFertMap,$fertToWaterMap,$waterToLightMap,$lightToTempMap,$tempToHumidityMap,$humidityToLocationMap];
//echo json_encode($part2Ranges);
$lowestValue = null;
// part1();
// return;
foreach ($part2Ranges as $range ){
    echo "On range " . json_encode($range) . "\n";
    $start = $range[0];
    $length = $range[1];
    for ($i=0; $i<$length; $i++){
        $currentSeed = $start + $i;
        $debugString = $currentSeed . " ";
        $starterValue = (int)$currentSeed;
        foreach ($allMaps as $mapIndex => $currentMap){
            $mappedValue = findMappedValue($currentMap,$starterValue);
            $debugString .= $mappedValue . " ";
            $starterValue = $mappedValue;
        }
        if (is_null($lowestValue)){
            $lowestValue = $starterValue;
        } elseif ( $starterValue < $lowestValue){
            $lowestValue = $starterValue;
        }
//        echo $debugString . "\n";
//        echo $currentSeed . " " . $starterValue . "\n";
    }
}

echo "the lowest value is: \n";
echo $lowestValue;
function part1(){
    global $startingSeeds, $allMaps;
    foreach ($startingSeeds as $currentSeed) {
        $debugString = $currentSeed . " ";
        $starterValue = (int)$currentSeed;
        foreach ($allMaps as $mapIndex => $currentMap){
            $mappedValue = findMappedValue($currentMap,$starterValue);
            $debugString .= $mappedValue . " ";
            $starterValue = $mappedValue;
        }
        if (is_null($lowestValue)){
            $lowestValue = $starterValue;
        } elseif ( $starterValue < $lowestValue){
            $lowestValue = $starterValue;
        }
        echo $debugString . "\n";
        echo $currentSeed . " " . $starterValue . "\n";
    }
}

function parseMap($fileContents){
    $lines = explode("\r\n", $fileContents);
    $map = [];
    foreach ( $lines as $index => $line){
        $lineArray = explode(' ', $line);
//        $source = (int) $lineArray[0];
//        $destination = (int) $lineArray[1];
//        $range = (int) $lineArray[2];
        $map[] = $lineArray;
    }
    return $map;
}

function findMappedValue($map, $input){
    foreach ( $map as $index => $row) {
        $source = (int) $row[1];
        $destination = (int) $row[0];
        $range = (int) $row[2];
        if ($input >= $source && $input <= ($source + $range - 1) ){
            return ($input - $source) + $destination;
        }
    }
    return $input;
}
//Find the lowest value of a target array's splits given the source array.
function findArraySplits(){
    
}
//122638653 not correct too low
//152386241 too low
//403695602 correct