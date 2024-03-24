package main

import (
	"fmt"
	"log"
	"net/http"
)

const PORT = ":3333"

func main() {
	router := http.NewServeMux()

	router.HandleFunc("/", handleRoot)

	server := http.Server{
		Addr:    PORT,
		Handler: router,
	}

	fmt.Println("Server listening on port :3333")
	server.ListenAndServe()
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	log.Println("received / request")
	w.Write([]byte("Hello, this is the root!"))
}
