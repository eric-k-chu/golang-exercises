package user

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func ReadUser(id int16) (*User, error) {
	url := fmt.Sprintf("https://jsonplaceholder.typicode.com/users/%d", id)
	res, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("error reading user: %v", err)
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %v", res.Status)
	}

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading response body: %v", err)
	}

	var user User
	err = json.Unmarshal(body, &user)
	if err != nil {
		return nil, fmt.Errorf("error parsing JSON: %v", err)
	}
	return &user, nil
}
