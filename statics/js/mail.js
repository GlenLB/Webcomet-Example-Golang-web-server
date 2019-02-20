// MAIL
let btnSubmit = document.getElementById('btnSubmit');

btnSubmit.onclick = () => {
    let emailAddress = document.getElementById('emailAddress').value;
    let message = document.getElementById('message').value;

    if (emailAddress.length >= 10 && message.length >= 10 && emailAddress.includes('@')) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                console.log(xhr.responseText);
                if (xhr.responseText == 'ok') {
                    document.getElementsByTagName('form')[0].innerHTML += '<div style="background:yellowgreen; color: white; padding: 20px; text-align:center; margin-top: 40px; border-radius: 20px;">Votre message a été envoyé avec succès. J\'y répondrai dans les meilleurs délais</div>';
                    window.scrollTo(0, document.body.scrollHeight);
                } else if (xhr.responseText == 'error') {
                    document.getElementsByTagName('form')[0].innerHTML += '<div style="background:red; color: white; padding: 20px; text-align:center; margin-top: 40px; border-radius: 20px;">Désolé il semble qu\'il y ait eu une erreur. Merci de réesayer</div>';
                    window.scrollTo(0, document.body.scrollHeight);
                }
            }
        }
        xhr.open('POST', '/mail', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('emailAddress=' + emailAddress + '&message=' + message);
    } else {
        document.getElementsByTagName('form')[0].innerHTML += '<div style="background:red; color: white; padding: 20px; text-align:center; margin-top: 40px; border-radius: 20px;">Merci de bien remplir les champs demandés</div>';
        window.scrollTo(0, document.body.scrollHeight);
    }
}