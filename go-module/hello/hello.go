package main

import (
	"fmt"

	"golang-exercises/greetings"
)

func main() {
	message := greetings.Hello("Eric")
	fmt.Println(message)
}