package user

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type User struct {
	ID       int16
	Name     string
	Username string
	Email    string
	Address  Address
	Phone    string
	Website  string
	Company  TinyCompany
}

type Address struct {
	Street  string
	Suite   string
	City    string
	Zipcode string
	Geo     LatLng
}

type LatLng struct {
	Lat float64
	Lng float64
}

type TinyCompany struct {
	Name        string
	CatchPhrase string
	BS          string
}

func ReadUser(id int16) (*User, error) {
	res, err := http.Get("https://jsonplaceholder.typicode.com/users/" + string(id))
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
