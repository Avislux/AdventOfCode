package main

import (
	"fmt"
	"strings"
	"os"
	//"strconv"
	//"sort"
)
func check(e error) {
    if e != nil {
		fmt.Println(e)
        panic(e)
    }
}
type Round struct {
	Opponent, Response string
}
func main(){
	data, err := os.ReadFile("inputs/day2.txt")
	check(err)
	str := string(data)
	lines := strings.Split(str, "\r\n")
	total := 0
	total2 := 0
	scoreMap := make(map[Round]int) 
	scoreMap2 := make(map[Round]int) 
	
	//Rock draw, loss, win
	scoreMap[Round{Opponent:"A",Response:"X"}] = 4
	scoreMap[Round{Opponent:"B",Response:"X"}] = 1
	scoreMap[Round{Opponent:"C",Response:"X"}] = 7
	//paper win, draw, loss
	scoreMap[Round{Opponent:"A",Response:"Y"}] = 8
	scoreMap[Round{Opponent:"B",Response:"Y"}] = 5
	scoreMap[Round{Opponent:"C",Response:"Y"}] = 2
	//siz loss, win, draw
	scoreMap[Round{Opponent:"A",Response:"Z"}] = 3
	scoreMap[Round{Opponent:"B",Response:"Z"}] = 9
	scoreMap[Round{Opponent:"C",Response:"Z"}] = 6
	//loss sic, rock, paper 
	scoreMap2[Round{Opponent:"A",Response:"X"}] = 3
	scoreMap2[Round{Opponent:"B",Response:"X"}] = 1
	scoreMap2[Round{Opponent:"C",Response:"X"}] = 2
	//draw 
	scoreMap2[Round{Opponent:"A",Response:"Y"}] = 4
	scoreMap2[Round{Opponent:"B",Response:"Y"}] = 5
	scoreMap2[Round{Opponent:"C",Response:"Y"}] = 6
	//win paper, sic, rock
	scoreMap2[Round{Opponent:"A",Response:"Z"}] = 8
	scoreMap2[Round{Opponent:"B",Response:"Z"}] = 9
	scoreMap2[Round{Opponent:"C",Response:"Z"}] = 7
	for _, line := range lines {
		hands := strings.Split(line, " ")
		round := Round{
			Opponent: hands[0],
			Response: hands[1],
		}
		total += scoreMap[round]
		total2 += scoreMap2[round]
	}
	fmt.Println(total)
	fmt.Println(total2)

}
//p1 12679
//p2 14470