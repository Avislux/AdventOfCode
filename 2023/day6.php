<?php
//No external text input needed.
//Funnily enough this could have done with simple math
part2();
function part1(){
    $dataSet = [
        [53,333],
        [83,1635],
        [72,1289],
        [88,1532]
    ];
    $solutionCounts = [0,0,0,0];
    $answer = 1;
    foreach ( $dataSet as $raceIndex => $race ){
        $raceDuration = $race[0];
        $raceRecord = $race[1];
        for ($i = 1; $i <= $raceDuration; $i++){
            $durationHold = $i;
            $travelDuration = $raceDuration - $i;
            $travelDistance =  $i * $travelDuration;
            if ($travelDistance > $raceRecord){
                $solutionCounts[$raceIndex]++;
            }
        }
    }
    foreach ($solutionCounts as $count){
        $answer *= $count;
    }
    var_dump($solutionCounts);
    echo "\n";
    echo $answer;
}

function part2(){
    $firstSolution = false;
    $lastSolutionFound = false;
    $lowerBound = null;
    $upperBound = null;
    $answer = 0;
    $maxDistance = 0;
    $maxDistanceHold = 0;
    $raceDuration = 53837288;
    $raceRecord = 333163512891532; // 333,163,512,891,532
//    $raceDuration = 71530;
//    $raceRecord = 940200;
    for ($i = 1; $i <= $raceDuration; $i++){
//        $durationHold = $i;
        $travelDuration = $raceDuration - $i;
        $travelDistance =  $i * $travelDuration;
        if ($travelDistance > $raceRecord){
            $answer++;
            if (!$firstSolution){
                $firstSolution = true;
                echo "First solution is: $i" . " with a distance of " . $travelDistance . "\n";
                $lowerBound = $i;
            }
            if ($travelDistance > $maxDistance){
                $maxDistance = $travelDistance;
                $maxDistanceHold = $i;
            }
        } elseif ($firstSolution && !$lastSolutionFound) {
            $lastSolutionFound = true;
            echo "Last solution is: $i" . " with a distance of " . $travelDistance."\n";
            $upperBound = $i;
        }
    }
    echo $answer;
    echo "\n";
    echo "try also: " . ($upperBound - $lowerBound);
    echo "\n";
    echo "Max Distance: ". $maxDistance . " at " . $maxDistanceHold;
}
//42251019 too high?