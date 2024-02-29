package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Entry struct {
	ID       string `json:"id"`
	Title    string `json:"title"`
	PhotoUrl string `json:"photoUrl"`
	Notes    string `json:"notes"`
}

type PartialEntry struct {
	Title    string `json:"title"`
	PhotoUrl string `json:"photoUrl"`
	Notes    string `json:"notes"`
}

var entries = []Entry{
	{ID: "1", Title: "Pikachu", PhotoUrl: "https://archives.bulbagarden.net/media/upload/thumb/4/4a/0025Pikachu.png/1200px-0025Pikachu.png", Notes: "eletric"},
	{ID: "2", Title: "Ceruledge", PhotoUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/937.png", Notes: "fire and ghost"},
	{ID: "3", Title: "Miraidon", PhotoUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/1008.png", Notes: "electric and dragon"},
}

func main() {
	router := gin.Default()
	router.GET("/entries", getEntries)
	router.GET("/entries/:id", getEntryById)
	router.POST("/entries", postEntry)
	router.DELETE("/entries/:id", deleteEntry)
	router.POST("/entries/:id", updateEntry)

	router.Run(":8080")
}

func getEntries(context *gin.Context) {
	context.IndentedJSON(http.StatusOK, entries)
}

func postEntry(context *gin.Context) {
	var newEntry Entry

	if err := context.BindJSON(&newEntry); err != nil {
		return
	}

	entries = append(entries, newEntry)
	context.IndentedJSON(http.StatusCreated, newEntry)
}

func getEntryById(context *gin.Context) {
	id := context.Param("id")

	for _, entry := range entries {
		if entry.ID == id {
			context.IndentedJSON(http.StatusOK, entry)
			return
		}
	}
	context.IndentedJSON(http.StatusNotFound, gin.H{"message": "entry not found"})
}

func deleteEntry(context *gin.Context) {
	id := context.Param("id")

	for i, entry := range entries {
		if entry.ID == id {
			entries = append(entries[:i], entries[i+1:]...)
			context.Status(http.StatusNoContent)
			return
		}
	}
	context.IndentedJSON(http.StatusNotFound, gin.H{"message": "entry not found"})
}

func updateEntry(context *gin.Context) {
	id := context.Param("id")

	var e PartialEntry

	if err := context.BindJSON(&e); err != nil {
		return
	}

	editedEntry := Entry{
		ID:       id,
		Title:    e.Title,
		PhotoUrl: e.PhotoUrl,
		Notes:    e.Notes,
	}

	for i, entry := range entries {
		if entry.ID == id {
			entries[i] = editedEntry
			context.IndentedJSON(http.StatusOK, entries[i])
			return
		}
	}

	context.IndentedJSON(http.StatusNotFound, gin.H{"message": "entry not found"})

}
