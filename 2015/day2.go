package main

import (
	"fmt"
	"strings"
	"os"
	"strconv"
	"sort"
)
func check(e error) {
    if e != nil {
		fmt.Println(e)
        panic(e)
    }
}
func main(){
	data, err := os.ReadFile("inputs/day2.txt")
	check(err)
	str := string(data)
	lines := strings.Split(str, "\r\n")
	total := 0
	ribbonTotal := 0
	for _, line := range lines {
		dimensions := strings.Split(line, "x")
		width,err := strconv.Atoi(dimensions[0])
		length,err := strconv.Atoi(dimensions[1])
		height,err := strconv.Atoi(dimensions[2])
		check(err)
		dimensionsInt := []int{width,length,height}
		sort.Ints(dimensionsInt)
		ribbonTotal += 2* dimensionsInt[0] + 2* dimensionsInt[1]
		ribbonTotal += width*length*height
		sides := make([]int,0)
		sides = append(sides, 2*width*length)
		sides = append(sides, 2*height*length)
		sides = append(sides, 2*width*height)
		sort.Ints(sides)
		sides = append(sides, sides[0]/2)
		for _, side := range sides {
			total += side
		}
	}
	fmt.Println(total)
	fmt.Println(ribbonTotal)

}
//1598415
//3812909