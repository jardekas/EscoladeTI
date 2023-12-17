document.addEventListener("DOMContentLoaded", function () {

    const contatoSelect = document.getElementById("tipoContato");
    const contatoTelefone = document.getElementById("contatoTelefone");
    const contatoEmail = document.getElementById("contatoEmail");
    const telefoneInput = document.getElementById("contato");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const dataNascimentoInput = document.getElementById("dataNascimento");
    const btnCadastro = document.getElementById("btnEnviaCodigo")

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
    
    contatoSelect.addEventListener("change", function () {
        console.log("Contato selecionado:", contatoSelect.value);

        if (contatoSelect.value === "Telefone") {
            contatoTelefone.style.display = "block";
            contatoEmail.style.display = "none";
            telefoneInput.placeholder = "(00) 0 0000 0000";
            telefoneInput.setAttribute("required", "true")
        } else if (contatoSelect.value === "Email") {
            contatoTelefone.style.display = "none";
            contatoEmail.style.display = "block";
            emailInput.placeholder = "endereco@gmail.com";
            emailInput.setAttribute("required", "true")
        } else {
            contatoTelefone.style.display = "none";
            contatoEmail.style.display = "none";
        }
    });

    telefoneInput.addEventListener("input", function () {
        if (contatoSelect.value === "Telefone") {
            const value = telefoneInput.value.replace(/\D/g, "");

            if (value.length <= 11) {
                const formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)} ${value.slice(7)}`;
                telefoneInput.value = formattedValue;
            }
        }
    });

    var data;

    btnCadastro.addEventListener("click", function (event) {
        event.preventDefault(); // Evitar envio padrão do formulário

        // Calcular a idade a partir da data de nascimento
        const dataNascimento = new Date(dataNascimentoInput.value);
        console.log(dataNascimento)
        data = dataNascimento;

        // Incrementar 1 dia na data de nascimento
        dataNascimento.setDate(dataNascimento.getDate() + 1);
        const hoje = new Date();
        const idade = hoje.getFullYear() - dataNascimento.getFullYear();
        
        // Verificar se a pessoa tem pelo menos 18 anos
        if (dataNascimentoInput.value === '') {
            showAlert("O campo Data de nascimento é obrigatório!");
        } else if (idade >= 18) {
            showAlert("O monitorado não pode ter idade maior ou igual a 18 anos!");
        } else if (contatoSelect.value === '') {
            showAlert('Por favor, selecione algum tipo de contato!');
        } else if (contatoSelect.value === 'Email' && emailInput.value === '') {
            showAlert('O campo de e-mail é obrigatório!');
        } else if (contatoSelect.value === 'Telefone' && telefoneInput.value.length < 16) {
            showAlert('Por favor, digite um telefone válido!');
        } else {
            //contato = contatoSelect.value === "Email" ? sendEmail(emailInput.value) : null; // Inserir codigo enviar SMS
            
            saveLoginBack(emailInput.value)
            teste();
            
            senhaInput.removeAttribute('disabled')
            contatoTelefone.style.display = "none";
            contatoEmail.style.display = "none";
            document.getElementById('divData').style.display = "none"
            document.getElementById('divTipoContato').style.display = "none"
            document.getElementById('imgLogoTelaCadastro').style.marginTop = "30px"
            btnCadastro.style.display = "none";
            document.getElementById('btnCadastrar').style.display = "block"
        }
            
    });

    const form = document.getElementById("formCadastro");
    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        
        if (await attemptLoginCadastro(emailInput.value, senhaInput.value) == "Sucesso!") {
            event.preventDefault();

            createUserEmail(emailInput.value, data);

            showAlert('Cadastro realizado com sucesso.');

            document.getElementById('btnCadastrar').setAttribute('disabled', 'disabled');
            document.getElementById('btnCadastrar').innerText = 'Carregando...';

            setTimeout(() => {
                chrome.tabs.create({ url: 'http://localhost:4200/aut' });
            }, 3000);

        } else {
            event.preventDefault()
            showAlert('Senha incorreta. Tente novamente!');
        }
    })
});
