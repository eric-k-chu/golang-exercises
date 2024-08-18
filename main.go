package main

import (
	"fmt"

	"goxuexi/user"
)

func main() {
	user, err := user.ReadUser(1)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Printf("User: %+v\n", user)
}
