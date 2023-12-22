<?php
const ROCK = 'O';
const CUBE = '#';
const GROUND = '.';
$debug = false;

$fileContents = file_get_contents('inputs/day14.txt');
$lines = explode("\r\n" , $fileContents );
$grid = [];
$tiltedGrid = [];
$tiltedRocks = [];
foreach ($lines as $indexY => $line) {
    $positions = str_split($line,1);
    $grid[] = $positions;
}
$gridLength = sizeof($grid[0]);
$gridHeight = sizeof($lines);
//echo $gridLength;
for ($x = 0; $x < $gridLength; $x++) {
    //evaluate each x column
    $tiltedGrid[$x] = [];
    $cubePositions = [];
    $rockPositions = [];
    $tiltedRockPositions = [];
    foreach ($grid as $columnY => $line ){
        if ($line[$x] == CUBE){
            $cubePositions[] = $columnY;
        } elseif ($line[$x] == ROCK) {
            $rockPositions[] = $columnY;
            
        }
    }
    echo "Cubes: " . json_encode($cubePositions) . "\tRocks: " . json_encode($rockPositions) . "\t";
    foreach ($rockPositions as $rock){
        //Find new position of the rock.
        //Skip this case because it's already set.
        if ($rock == 0){
            $tiltedRockPositions[] = 0; 
            continue;
        }
        //Position each rock respective to the north fence
        if (empty ($cubePositions) || $rock < $cubePositions[0] ){
            if ($debug) {
                if (empty ($cubePositions)){
                    echo "No cubes here ";
                } else {
                    echo $rock . " is less than "  . $cubePositions[0] . " ";
                }
            }
            if (empty ($tiltedRockPositions)){
                $tiltedRockPositions[] = 0;
            } else {
                $maxValue = max($tiltedRockPositions);
                $tiltedRockPositions[] = $maxValue + 1;
            }
//            echo json_encode($tiltedRockPositions);
            
            continue;
        }
        //That covered all rocks before the first cube. Now we iterate through each cube.
        foreach ( $cubePositions as $cubeIndex => $cube) {
            //Check if the rock is between this cube and the next. For the last cube, treat the bottom as a cube.
            $nextCube = $cubePositions[ $cubeIndex + 1 ] ?? $gridHeight;
            if ($rock < $cube){
                //Ignore
                continue;
            } elseif ($rock == $cube){
                echo "This isn't supposed to happen";
                exit;
            } elseif ($cube < $rock && $rock < $nextCube) {
                $tiltedPosition = $cube + 1;
                $positionDetermined = false;
                while (!$positionDetermined){
                    if (!in_array($tiltedPosition,$tiltedRockPositions)){
                        $tiltedRockPositions[] = $tiltedPosition;
                        $positionDetermined = true;
                        break;
                    }
                    $tiltedPosition++;
                    if ($tiltedPosition > $gridHeight){
                        echo "YOU DONE GOOFED";
                        exit;
                    }
                }
                //echo json_encode($tiltedRockPositions);
            }
        }
      
    }
    $tiltedRocks[] = $tiltedRockPositions;
    echo "\n";
}
echo json_encode($tiltedRocks) . "\n";

$load = 0;
foreach ($tiltedRocks as $column){
    foreach ($column as $rock){
        $load += ($gridHeight - $rock);
    }
}
echo $load;
//part 1 108144