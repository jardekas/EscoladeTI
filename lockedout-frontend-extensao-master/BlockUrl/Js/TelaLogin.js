document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const labelEmail = document.getElementById("labelEmail");
    const labelTelefone = document.getElementById("labelTel");
    const campoLogin = document.getElementById("campoLogin");
    const btnEnviaCodigo = document.getElementById("btnEnviaCodigo");
    const btnLogar = document.getElementById("btnLogar");
    const senha = document.getElementById("senha");

    labelTelefone.addEventListener('click', function() {
        labelTelefone.style.color = "#007bff";
        labelEmail.style.color = "";
        campoLogin.type = 'number'
        campoLogin.placeholder = "(00) 0 0000 0000";
        campoLogin.maxLength = 11;
        campoLogin.value = '';
    }) 

    labelEmail.addEventListener('click', function() {
        campoLogin.value = '';
        labelEmail.style.color = "#007bff";
        labelTelefone.style.color = "";
        campoLogin.type = 'email'
        campoLogin.placeholder = "endereco@gmail.com";
    })

    // Funções para aparição do pop-up de alerta 

    function showAlert(message) {
        document.getElementById("alert-message").textContent = message;
        const alert = document.getElementById("custom-alert");
        alert.classList.add("show");
    
        // Configura um temporizador para remover a classe 'show' após a duração especificada (5 segundos por padrão)
        setTimeout(function () {
            closeAlert();
        }, 3000);
    }
    
    function closeAlert() {
        const alert = document.getElementById("custom-alert");
        alert.classList.remove("show"); 
    }

    document.getElementById('close-button').addEventListener('click', function () {
        closeAlert();
    })

    //******** */


    btnEnviaCodigo.addEventListener("click", function (event) {
        event.preventDefault(); // Evitar envio padrão do formulário

        const login = document.getElementById("campoLogin").value.toString();

        if (login === '') {
            showAlert('O campo de e-mail é obrigatório!');
            return false;
        }

        saveLoginBack(login)
        teste();

        campoLogin.setAttribute('disabled', 'disabled');
        document.getElementById('senha').removeAttribute('disabled');
        btnEnviaCodigo.style.display = 'none';
        btnLogar.style.display = 'block';

    });

    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        if (await attemptLoginCadastro(campoLogin.value, senha.value) == "Sucesso!"){
            event.preventDefault();

            showAlert('Login realizado com sucesso.');

            btnLogar.setAttribute('disabled', 'disabled');
            btnLogar.innerText = 'Carregando...';

            setTimeout(() => {
                chrome.tabs.create({ url: 'http://localhost:4200/aut' });
            }, 1000);

        } else {
            event.preventDefault()
            showAlert('Senha incorreta. Tente novamente!');
        }
    })
});
