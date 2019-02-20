// Router.
// Les handlers se trouvent dans le fichier handlers.go.
package main

import (
	"net/http"
)

func main() {
	// Pages principales du site web et 404
	http.HandleFunc("/", handlePagesPrincipales)
	// Pour gérer l'envoi de mail
	http.HandleFunc("/mail", handleMail)
	// Ressources statiques
	http.Handle("/statics/", http.StripPrefix("/statics/", http.FileServer(http.Dir("./statics"))))
	// robots.txt
	http.Handle("/robots.txt", http.FileServer(http.Dir("./")))
	// sitemap.xml
	http.Handle("/sitemap.xml", http.FileServer(http.Dir("./")))
	// favicon.ico
	http.Handle("/favicon.ico", http.FileServer(http.Dir("./")))

	// Lancement du serveur
	http.ListenAndServe(":8080", nil)
}
