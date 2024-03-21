package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/", getRoot)

	err := http.ListenAndServe("127.0.0.1:42069", nil)

	if err != nil {
		fmt.Printf("Error in starting the server: %s\n", err)
		os.Exit(1)
	}
}

func getRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Println("received / request")
	io.WriteString(w, "Hello World\n")
}
