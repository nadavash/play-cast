package playcast

import (
	"fmt"
	"net/http"

	"html/template"
)

func init() {
	http.HandleFunc("/", handler)
}

func handler(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("html/index.html")
	if (err != nil) {
		fmt.Fprint(w, err.Error())
	}

    tmpl.Execute(w, nil)
}