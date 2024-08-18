package user

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
	Lat string
	Lng string
}

type TinyCompany struct {
	Name        string
	CatchPhrase string
	BS          string
}
