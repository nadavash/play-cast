package playcast

import (
	"fmt"
	"net/http"

	"html/template"
)

func init() {
	http.HandleFunc("/", handler)
	http.HandleFunc("/join", joinHandler)
	http.HandleFunc("/host", hostHandler)
	http.HandleFunc("/numberwang", numberHandler)
	http.HandleFunc("/tictactoe", tictactoeHandler)
}

func displayTemplate(htmlTmp string, w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles(htmlTmp)
	if (err != nil) {
		fmt.Fprint(w, err.Error())
	}
    tmpl.Execute(w, nil)
}

func handler(w http.ResponseWriter, r *http.Request) {
	displayTemplate("html/index.html", w, r)
}

func joinHandler(w http.ResponseWriter, r *http.Request) {
	displayTemplate("html/join.html", w, r)
}

func hostHandler(w http.ResponseWriter, r *http.Request) {
	displayTemplate("html/host.html", w, r)
}

func numberHandler(w http.ResponseWriter, r *http.Request) {
	displayTemplate("html/numberwang.html", w, r)
}

func tictactoeHandler(w http.ResponseWriter, r *http.Request) {
	displayTemplate("html/tictactoe.html", w, r)
}