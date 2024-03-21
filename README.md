# golang-playground

A personal repository for learning Golang

If this error appears, `Operation did not complete successfully because the file contains a virus or potentially unwanted software.`, change the `GOTMPDIR` env variable to a file location that you can exclude from your antivirus

VSCode will show an error when having [multiple Go Projects in a directory](https://stackoverflow.com/questions/65748509/vscode-shows-an-error-when-having-multiple-go-projects-in-a-directory), which is why a `go.work` file is needed in the root dir.
