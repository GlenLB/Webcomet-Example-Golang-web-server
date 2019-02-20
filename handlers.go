// Contient les handlers du site web.
// Routeur secondaire.
//
// Pour ajouter une page html :
// Ajouter un case au switch de la fonction handlePagesPrincipales.
// Ajouter le template .html.
//
// Convention : le nom de fichier est identique à l'URL qui y mène.
// Convention : le nom du template est identique à l'URL qui y mène.
package main

import (
	"html/template"
	"net/http"
	"webserver/erreurs"
	"webserver/mail"
)

// Page stocke les informations dynamiques d'une page à insérer dans les template.
type Page struct {
	Title       string
	Description string
	Canonical   string
	H1          template.HTML
}

// Handler pour les pages principales du site web.
// Si l'URL ne fait pas partie des pages principales, on appelle la fonction qui gere les 404.
func handlePagesPrincipales(w http.ResponseWriter, r *http.Request) {
	var page Page
	// Convention : le nom de fichier est identique à l'URL qui y mène
	var nomFichier string = r.URL.Path[1:] + ".html"
	// Convention : le nom du template est identique à l'URL qui y mène
	var nomTemplate string = r.URL.Path[1:]
	// Créé les données à insérer dans les template en fonction de la page demandée
	switch r.URL.Path {
	case "/":
		// Redéfinition du nom de fichier et de template car la route "/" ne permet pas de suivre la convention
		nomFichier = "index.html"
		nomTemplate = "index"
		page = Page{
			Title:       "WebComet.fr - Création de site vitrine et référencement naturel SEO à Rennes - Webmaster freelance",
			Description: "Vous cherchez un webmaster ou développeur web freelance pour créer votre site vitrine ? Vous cherchez un consultant SEO pour améliorer votre référencement naturel ? Alors contactez-moi, car je dispose des compétences pour vous créer un site web au référencement naturel optimisé",
			H1:          "Création de site web &amp;<br> Référencement naturel SEO à Rennes",
		}
	case "/webmaster-creation-site-vitrine":
		page = Page{
			Title:       "Webmaster Création de site vitrine à Rennes et SEO",
			Description: "Création de site vitrine",
			H1:          "Création de site vitrine professionnel",
		}
	case "/consultant-seo":
		page = Page{
			Title:       "Consultant SEO freelance à Rennes - Webmaster consultant référencement naturel",
			Description: "Consultant SEO freelance à Pacé près de Rennes, je dispose des compétences pour améliorer la visibilité de votre site web sur les moteurs de recherche comme Google. En améliorant le SEO de votre site web, vous capterez plus de trafic sur votre site web.",
			H1:          "Consultant SEO (référencement naturel)<br> freelance à Rennes",
		}
	case "/conditions-generales":
		page = Page{
			Title:       "Webcomet.fr - Conditions générales de vente",
			Description: "Webcomet.fr : Conditions générales de vente.",
			H1:          "Webcomet.fr : Conditions générales de vente",
		}
	case "/mentions-legales":
		page = Page{
			Title:       "Webcomet.fr - Mentions légales",
			Description: "Webcomet.fr : Mentions légales.",
			H1:          "Webcomet.fr : Mentions légales",
		}
	case "/cv":
		// Sert le fichier de CV non dynamique
		http.ServeFile(w, r, "cv.html")
		return
	// Si l'URL ne fait pas partie des pages principales, appelle la fonction qui gere les 404 et stoppe l'exécution de la fonction
	default:
		nomFichier = "404.html"
		nomTemplate = "404"
		page = Page{
			Title:       "Webcomet erreur 404",
			Description: "Webcomet erreur 404",
			H1:          "Erreur 404",
		}
	}

	// Definition de l'URL canonique
	page.Canonical = r.URL.String()
	// Récupération des template nécessaires
	t, err := template.ParseFiles(nomFichier, "partials.html")
	if err != nil {
		// Reponse http erreur 500 + message affiché à l'utilisateur
		http.Error(w, "Erreur serveur, merci de réessayer dans quelques minutes.\n", 500)
		// Gestion de l'erreur
		go erreurs.GestionErreurs(err)
		return
	}
	// Exécute le template avec les données de page
	t.ExecuteTemplate(w, nomTemplate, page)
}

// Handler pour gérer l'envoi de mail par l'utilisateur.
// Ecrit dans la reponse http "ok" si réussi, "error" sinon.
func handleMail(w http.ResponseWriter, r *http.Request) {
	// Récupère l'adresse mail de l'utilisateur dans les paramètres POST
	emailAddress := r.PostFormValue("emailAddress")
	// Récupère le message de l'utilisateur dans les paramètres POST
	body := r.PostFormValue("message")
	if len(emailAddress) > 0 && len(body) > 0 {
		// Fonction définie dans le fichier webserver/mail/mail.go
		err := mail.EnvoiMail(emailAddress, body)
		// Definit le content-type à text, charset utf-8
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		// Si l'envoi de mail est réussi ecrit dans w "ok", "error" sinon
		if err == nil {
			w.Write([]byte("ok"))
		} else {
			w.Write([]byte("error"))
		}
	}
}

// Handler qui gere les erreurs 404.
func handle404(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Erreur 404 : page non trouvée"))
}
