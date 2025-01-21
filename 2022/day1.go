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
	data, err := os.ReadFile("inputs/day1.txt")
	check(err)
	str := string(data)
	groups := strings.Split(str, "\r\n\r\n")
	maxCals := 0
	elves := make([]int,0)
	for _, group := range groups {
		lines := strings.Split(group, "\r\n")
		groupCals := 0
		for _, line := range lines {
			cals,_ := strconv.Atoi(line)
			groupCals += cals
		}
		if maxCals < groupCals {
			maxCals = groupCals
		}
		elves = append(elves,groupCals)
	}
	sort.Ints(elves);
	part2Total := 0
	lastThree := elves[(len(elves) -3 ):]
	for _, number := range lastThree {
		part2Total+=number
	}

	fmt.Println(maxCals)
	fmt.Println(part2Total)

}
//part 1: 70720
//p2: 207148