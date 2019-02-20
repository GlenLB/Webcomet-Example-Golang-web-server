// Router.
// Les handlers se trouvent dans le fichier handlers.go.
package main

import (
	"net/http"
	"webserver/mail"
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

	// Redirection de http à https
	go http.ListenAndServe(":80", http.HandlerFunc(httpsRedirect))
	// Lancement du serveur https
	if err := http.ListenAndServeTLS(":443", "/etc/letsencrypt/live/webcomet.fr/fullchain.pem", "/etc/letsencrypt/live/webcomet.fr/privkey.pem", nil); err != nil {
		mail.EnvoiMail("lebaill.glen@gmail.com", err.Error())
		panic(err)
	}
}

// Redirection de http à https.
func httpsRedirect(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "https://"+r.Host+r.URL.String(), http.StatusMovedPermanently)
}
