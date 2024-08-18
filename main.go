package main

import (
	"fmt"

	"github.com/eric-k-chu/goxuexi/user"
)

func main() {
	user, err := user.ReadUser(1)

	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Printf("User: %+v\n", user)
}
