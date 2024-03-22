package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

const PORT = "3333"
const URL = "localhost:" + PORT

func main() {
	http.HandleFunc("/", getRoot)

	err := http.ListenAndServe(URL, nil)

	if err != nil {
		fmt.Printf("Error in starting the server: %s\n", err)
		os.Exit(1)
	}
}

func getRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Println("received / request")
	io.WriteString(w, "Hello World\n")
}
