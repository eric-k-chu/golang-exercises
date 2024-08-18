package user

type User struct {
	ID       int16       `json:"id"`
	Name     string      `json:"name"`
	Username string      `json:"username"`
	Email    string      `json:"email"`
	Address  Address     `json:"address"`
	Phone    string      `json:"phone"`
	Website  string      `json:"website"`
	Company  TinyCompany `json:"company"`
}

type Address struct {
	Street  string `json:"street"`
	Suite   string `json:"suite"`
	City    string `json:"city"`
	Zipcode string `json:"zipcode"`
	Geo     LatLng `json:"geo"`
}

type LatLng struct {
	Lat string `json:"lat"`
	Lng string `json:"lng"`
}

type TinyCompany struct {
	Name        string `json:"name"`
	CatchPhrase string `json:"catchPhrase"`
	BS          string `json:"bs"`
}
