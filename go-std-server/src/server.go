package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
)

func main() {
	portPtr := flag.String("port", "3333", "port number")

	flag.Parse()

	router := http.NewServeMux()

	router.HandleFunc("/", handleRoot)

	server := http.Server{
		Addr:    *portPtr,
		Handler: router,
	}

	fmt.Println("Server listening on port", *portPtr)
	server.ListenAndServe()
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	log.Println("received / request")
	w.Write([]byte("Hello, this is the root!"))
}
