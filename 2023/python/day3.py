from pathlib import Path
import re

def main():
    file_path = 'inputs/day3.txt'
    contents = Path(file_path).read_text()
    regex = re.compile("(\d+)")
    lines = contents.split('\n')
    numbers = []
    gears = {}
    sum = 0
    sumGearRatios = 0
    for lineIndex, line in enumerate(lines):
        numbers.append([])
        for matchIndex, match in enumerate(regex.finditer(line)):

            numbers[lineIndex].append(match)
            #print(matchIndex, match.start(), match.group())
        pass

    #print(numbers)
    for lineIndex, lineMatches in enumerate(numbers):
        for match in lineMatches:
            partNumber = int(match.group())
            adjacentCells = determineAdjacentCells(lineIndex, match.start(), match.end())
            #print (adjacentCells,match.group() )
            numberHasAdjacentPart = False
            for cell in adjacentCells:
                #Cells are (Y,X) tuples. count down, then right
                cellX = cell[1]
                cellY = cell[0]
                #print (cell)
                if cellX < 0 or cellY < 0 or cellX > len(line) - 1 or cellY > len(lines) - 1:
                    continue
                character = lines[cellY][cellX]
                if not character == '.':
                    numberHasAdjacentPart = True
                    #print (character, cell)
                    #print ("adding", match.group())
                if character == '*':
                    if cell not in gears.keys():
                        gears[cell] = [partNumber]
                    else:
                        gears[cell].append(partNumber)
            if numberHasAdjacentPart:
                sum += int(partNumber)
    print (sum) #part 1
    print (gears)
    for gear in gears:
        adjacentParts = gears[gear]
        #print (gears[gear],len(adjacentParts))
        if len(adjacentParts) == 2:
            gearRatio = int(adjacentParts[0]) * int(adjacentParts[1])
            sumGearRatios += gearRatio
    print ("Sum gear ratios:", sumGearRatios) # part 2
    #print (lineIndex, lineMatches)


def determineAdjacentCells(lineNumber,start,end):
    adjacentCells = []
    for i in range(start,end):
        adjacentCells.append((lineNumber - 1,i)) #above
        adjacentCells.append((lineNumber + 1, i))  # below
    adjacentCells.append((lineNumber, start -1))  # left
    adjacentCells.append((lineNumber, end))  # right
    #top left, top right, bot left, bot right
    adjacentCells.append((lineNumber - 1, start -1))
    adjacentCells.append((lineNumber - 1, end ))
    adjacentCells.append((lineNumber + 1, start - 1))
    adjacentCells.append((lineNumber + 1, end))
    return adjacentCells

if __name__ == '__main__':
    main()


#part 1 550934
#part 2 81997870