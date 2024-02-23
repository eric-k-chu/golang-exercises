package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Todo struct {
	ID    string `json:"id"`
	Title string `json:"title"`
}

type PartialTodo struct {
	Title string `json:"title"`
}

var todos = []Todo{
	{ID: "1", Title: "bla"},
	{ID: "2", Title: "xdd"},
	{ID: "3", Title: "xpp"},
}

func main() {
	router := gin.Default()
	router.GET("/todos", getTodos)
	router.GET("/todos/:id", getTodoById)
	router.POST("/todos", postTodo)
	router.DELETE("/todos/:id", deleteTodo)
	router.PATCH("/todos/:id", patchTodo)

	router.Run("localhost:8080")
}

func getTodos(context *gin.Context) {
	context.IndentedJSON(http.StatusOK, todos)
}

func postTodo(context *gin.Context) {
	var newTodo Todo

	if err := context.BindJSON(&newTodo); err != nil {
		return
	}

	todos = append(todos, newTodo)
	context.IndentedJSON(http.StatusCreated, newTodo)
}

func getTodoById(context *gin.Context) {
	id := context.Param("id")

	for _, todo := range todos {
		if todo.ID == id {
			context.IndentedJSON(http.StatusOK, todo)
			return
		}
	}
	context.IndentedJSON(http.StatusNotFound, gin.H{"message": "todo not found"})
}

func deleteTodo(context *gin.Context) {
	id := context.Param("id")

	for i, todo := range todos {
		if todo.ID == id {
			todos = append(todos[:i], todos[i+1:]...)
			context.Status(http.StatusNoContent)
			return
		}
	}
	context.IndentedJSON(http.StatusNotFound, gin.H{"message": "todo not found"})
}

func patchTodo(context *gin.Context) {
	id := context.Param("id")

	var newTodo PartialTodo

	if err := context.BindJSON(&newTodo); err != nil {
		return
	}

	for i, todo := range todos {
		if todo.ID == id {
			todos[i].Title = newTodo.Title
			context.IndentedJSON(http.StatusOK, todos[i])
			return
		}
	}

	context.IndentedJSON(http.StatusNotFound, gin.H{"message": "todo not found"})
}
