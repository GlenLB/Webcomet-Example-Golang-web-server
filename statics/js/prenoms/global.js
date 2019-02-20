/**
 * Gère l'ajout et la suppression de prenoms dans la liste du formulaire
 * 
 * TODO pouvoir supprimer prénoms de la liste des prénoms
 * TODO quand clic sur input ajout prénom, check et uncheck les checkbox adéquates
 * TODO ne faire apparaitre la liste des prénoms que si un prénom a déjà été inséré
 */
function ajoutSupprPrenoms() {
    const btnAjoutPrenom = document.getElementById("btnAjoutPrenom");
    const listePrenoms = document.getElementById("listePrenoms");
    const inputAjoutPrenom = document.getElementById("ajoutPrenom");
    let tableauPrenoms = [];
    listePrenoms.innerHTML = "<ul>";
    btnAjoutPrenom.addEventListener("click", (e) => {
        e.preventDefault();
        let valeurSaisie = inputAjoutPrenom.value.trim();
        if (valeurSaisie.length > 0) {
            tableauPrenoms.push(valeurSaisie);
            let i = tableauPrenoms.length - 1;
            // Enlève la fermeture </ul> de la liste
            listePrenoms.innerHTML.replace("</ul>", "");
            listePrenoms.innerHTML += "<li id=\"li" + i + "\">" + valeurSaisie + " <button id=\"btnSuppression" + i + "\">Retirer</button></li>";
            listePrenoms.innerHTML += "</ul>";
            //ajouterListenerDernierBouton();
        }
    });
}
ajoutSupprPrenoms();

/*function ajouterListenerDernierBouton() {
    for(let i = 0; i < tableauPrenoms.length; i++) {
        if(i === (tableauPrenoms.length - 1)) {
            document.getElementById("btnSuppression" + i).addEventListener("click", (e) => {
                e.preventDefault();
                console.log(i);
                document.getElementById("li" + i).style.display = "none";
                tableauPrenoms.splice(i, 1);
                console.log(tableauPrenoms);
            })
        }
    }
}*/


// ---------------------------------------
/**
 * Désactive dynamiquement certaines parties du formulaire en fonction des intéractions de l'utilisateur
 */
function formDynamique() {
    const checkboxAnnee = document.getElementById("checkboxAnnee");
    const selectAnnee = document.getElementById("selectAnnee");
    const checkboxPeriode = document.getElementById("checkboxPeriode");
    const selectPeriode = document.getElementById("selectPeriode");
    const selectPeriode2 = document.getElementById("selectPeriode2");
    const checkboxObtenirRes = document.getElementById("checkboxObtenirRes");
    const checkboxObtenirPrenom = document.getElementById("checkboxObtenirPrenom");
    const selectResultats = document.getElementById("selectResultats");
    let booleanAnnee = false;
    // Si on clique sur le select, on coche la checkbox correspondante
    // On ne peut pas sélectionner une année et une période en même temps (donc soit l'un, soit l'autre)
    checkboxAnnee.addEventListener("click", () => {
        checkboxPeriode.checked = false;
        booleanAnnee = true;
        formToggle(booleanAnnee);
    })
    checkboxPeriode.addEventListener("click", () => {
        checkboxAnnee.checked = false;
        booleanAnnee = false;
        formToggle(booleanAnnee);
        toggleOrdre(false);
    })
    selectAnnee.addEventListener("click", () => {
        checkboxAnnee.checked = true;
        checkboxPeriode.checked = false;
        booleanAnnee = true;
        formToggle(booleanAnnee);
    })
    selectPeriode.addEventListener("click", () => {
        checkboxPeriode.checked = true;
        checkboxAnnee.checked = false;
        booleanAnnee = false;
        formToggle(booleanAnnee);
    })
    selectPeriode2.addEventListener("click", () => {
        checkboxPeriode.checked = true;
        checkboxAnnee.checked = false;
        booleanAnnee = false;
        formToggle(booleanAnnee);
    })
    // Si les données ne sont pas choisies individuellement, on propose de les classer par ordre croissant / décroissant
    checkboxObtenirRes.addEventListener("click", () => {
        checkboxObtenirPrenom.checked = false;
        toggleOrdre();
    })
    // Sinon on ne propose pas cette fonctionnalité
    checkboxObtenirPrenom.addEventListener("click", () => {
        checkboxObtenirRes.checked = false;
        toggleOrdre();
    })
    selectResultats.addEventListener("click", () => {
        checkboxObtenirRes.checked = true;
        checkboxObtenirPrenom.checked = false;
        toggleOrdre();
    })
}
formDynamique();

/**
 * On affiche le choix de trier par ordre croissant ou décroissant uniquement si la checkbox de l'obtention des résultats
 * est cochée et que celle de l'obtention de prénoms au choix est décochée
 */
function toggleOrdre() {
    if (checkboxObtenirRes.checked && !checkboxObtenirPrenom.checked) {
        document.getElementById("labelOrdre").style.display = "inline-block";
        document.getElementById("ordre").style.display = "inline-block";
    } else {
        document.getElementById("labelOrdre").style.display = "none";
        document.getElementById("ordre").style.display = "none";
    }
}

function formToggle(annee) {
    if (annee) {
        // Les données pour une année précise ne peuvent pas être visualisées sous forme d'un graphique en lignes
        document.getElementById("ligne").style.display = "none";
        document.getElementById("baton").style.display = "block";
        document.getElementById("tableau").style.display = "block";
        document.getElementById("diagramme").style.display = "block";
        document.getElementById("baton").selected = true;
        document.getElementById("ligne").selected = false;
    } else {
        // Une période ne peut être visualisée que sous la forme d'un graphique en lignes
        document.getElementById("ligne").style.display = "block";
        document.getElementById("baton").selected = false;
        document.getElementById("ligne").selected = true;
        document.getElementById("baton").style.display = "none";
        document.getElementById("tableau").style.display = "none";
        document.getElementById("diagramme").style.display = "none";
    }

}


// ---------------------------------------
/**
 * Gère l'envoi des critères sélectionnés en AJAX au script PHP
 */
