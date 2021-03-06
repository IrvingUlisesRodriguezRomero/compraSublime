document.addEventListener('DOMContentLoaded', function () {
    let contact_name = document.getElementById('contact_name');
    let contact_lastname = document.getElementById('contact_lastname');
    let contact_email = document.getElementById('contact_email');
    let contact_mensaje = document.getElementById('contact_mensaje');
    let btn_enviar_contact = document.getElementById('btn_enviar_contact');
    let form_contact = document.getElementById('form_contact');

    btn_enviar_contact.addEventListener('click', (e) => {
        e.preventDefault();
        if(contact_name.value == "" || contact_lastname.value == "" || contact_email.value == "" || contact_mensaje.value == "") {
            Swal.fire({
                icon: 'error',
                title: 'Ningún campo puede quedar vacío',
                close: false,
            })
        }
        else if(contact_name.value.length < 5 || contact_lastname.value.length < 5 || contact_email.value.length < 5 || contact_mensaje.value.length < 5) {
            Swal.fire({
                icon: 'error',
                title: 'No puedes ingresar valores menores a 5 caracteres',
                close: false,
            })
        }
        else {
            let expresion = new RegExp(/[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/, "gi");
            let resultado = expresion.test(contact_email.value);

            if (resultado) {
                enviar_mensaje(contact_name.value, contact_lastname.value, contact_email.value, contact_mensaje.value);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Correo electrónico invalido',
                    close: false,
                })
            }
        }
    });
});

function enviar_mensaje(name, lastname, email, mensaje) {
    url = base + '/messages/user/send/'+name+'/'+lastname+'/'+email+'/'+mensaje;
    http.open('POST', url, true);
    http.setRequestHeader('X-CSRF-TOKEN', csrfToken);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = this.responseText;
            data = JSON.parse(data);
            if(data.status == "success") {
                Swal.fire({
                    icon: 'success',
                    title: 'Mensaje enviado',
                    text: 'Tu tu mensaje fue enviado exitosamente',
                })
            }
            
        }
    }
}