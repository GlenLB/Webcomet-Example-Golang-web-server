package erreurs

import (
	"os"
	"time"
	"webserver/mail"
)

// S'occupe de la gestion des erreurs en ajoutant une ligne dans le fichier de logs et en prévenant
// l'admin.
func GestionErreurs(err error) {
	// Ouvre le fichier de logs
	file, _ := os.OpenFile("./logErrors.log", os.O_APPEND|os.O_WRONLY, 0644)
	defer file.Close()
	// Ecrit la nouvelle ligne d'erreur dans le fichier de logs
	file.Write([]byte(time.Now().String() + "\t" + err.Error() + "\n"))
	// Envoi d'un mail à l'admin pour le prévenir
	mail.EnvoiMail("lebaill.glen@gmail.com", "ERREUR: "+err.Error())
}
