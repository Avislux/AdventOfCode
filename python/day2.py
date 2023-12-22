from pathlib import Path
import re
file_path = 'inputs/day2.txt'
contents = Path(file_path).read_text()
maxRed = 12
maxGreen = 13
maxBlue = 14
solution = 0
totalPower = 0
lines = contents.split('\n')
for line in lines:
    gameNumberMatch = re.search("Game ([0-9]*)", line)
    gameNumber = int(gameNumberMatch.groups()[0])
    games = line.split(": ")[1]
    draws = games.split("; ")
    gameQualified = True
    highestDrawRed = 0
    highestDrawGreen = 0
    highestDrawBlue = 0
    for draw in draws:
        colors = draw.split(", ")
        #print(draw)
        for color in colors:
            parsedDiceCount = re.search('([0-9]*) (blue|red|green)',color).groups()
            diceColor = parsedDiceCount[1]
            diceNumber = int(parsedDiceCount[0])
            #print (parsedDiceCount)
            if ((diceColor == 'red' and diceNumber > maxRed) or
                (diceColor == 'green' and diceNumber > maxGreen) or
                (diceColor == 'blue' and diceNumber > maxBlue) ):
                gameQualified = False
                #print (str(gameNumber) + " is NOT qualified")
            if diceColor == 'green' and diceNumber > highestDrawGreen:
                highestDrawGreen = diceNumber
            if diceColor == 'red' and diceNumber > highestDrawRed:
                highestDrawRed = diceNumber
            if diceColor == 'blue' and diceNumber > highestDrawBlue:
                highestDrawBlue = diceNumber
        #if not gameQualified:
            #break
    power = highestDrawGreen * highestDrawRed * highestDrawBlue
    totalPower += power
    if (gameQualified):
        solution += gameNumber
        print (str(gameNumber) + " is qualified")
print (solution)
print ("POOOOOWEEEER: ")
print(totalPower)
#part 1 2512
#part 2 67335