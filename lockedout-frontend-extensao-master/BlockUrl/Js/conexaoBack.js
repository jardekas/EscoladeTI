var serverhost = 'http://localhost:8080';

var urlsBloqueio = [];

// Teste Senha - Aparece no console;
async function teste() {
    var url = serverhost + '/login/testeSenha';
    console.log(url);

    var resposta = await fetch(url)
        .then(async response => await response.json())
        .catch(error => console.log(error))

    console.log(resposta);  // Will respond asynchronously.
}

async function getBloqueio(sendResponse) {
    var url = serverhost + '/bloqueio/findOne';
    var jsonEnvio = { "idUser": sendResponse };

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(jsonEnvio),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    if (!response.ok) {
        console.error(`Failed to fetch blocked URLs. Status: ${response.status}`);
        return null;
    }

    const data = await response.json();

    console.log(data)

    if (data && data.length > 0) {
        const newUrlsBloqueio = data.map(item => {
            return {
                urlRegex: new RegExp(`^${item.url.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}`),
                startHour: null,
                endHour: null,
            };
        });

        urlsBloqueio = newUrlsBloqueio;
    }

    return data;
}

getBloqueio(1)

async function enviaHistorico(idUser, historico, tempo) {
    var url = serverhost + '/historico/save';
    console.log(url);

    var jsonEnvio = {
        "idUser": idUser,
        "url": historico,
        "horario": tempo,
        "bloqueado": null,
    }

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(jsonEnvio),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}

async function salvaTempoAtivo(idHorario, tempo) {
    var url = serverhost + '/historico/set-time';
    console.log(url);

    var jsonEnvio = {
        "idHorario": idHorario,
        "tempo": tempo,
    }

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(jsonEnvio),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

}

async function login(login, senha) {
    var url = serverhost + '/login/attempt'
    console.log(url);

    var jsonEnvio = {
        "login": login,
        "senha": senha
    }

    var resposta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(jsonEnvio),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(async response => await response.json())

    console.log("Login Response:", resposta); // Adicionado log para a resposta de login
}

async function sendEmail(recepient) {
    var url = serverhost + '/login/sendEmail'
    console.log(url);

    var jsonEnvio = { "recepient": recepient }

    var resposta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(jsonEnvio),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(async response => await response.json())

    console.log(response.json);

    console.log(resposta);

    console.log("Email Response:", resposta); // Adicionado log para a resposta de e-mail
}

async function createUserEmail(email, dataNascimento) {
    var url = serverhost + '/addE'
    console.log(url);

    var jsonEnvio = {
        "email": email,
        "dataNascimento": dataNascimento
    }

    var resposta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(jsonEnvio),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(async response => await response.json())

    console.log("Create User Email Response:", resposta); // Adicionado log para a resposta de criação de usuário com e-mail
}

async function createUserTelefone(telefone, dataNascimento) {
    var url = serverhost + '/addT'
    console.log(url);

    var jsonEnvio = {
        "telefone": telefone,
        "dataNascimento": dataNascimento
    }

    var resposta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(jsonEnvio),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(async response => await response.json())

    console.log("Create User Phone Response:", resposta); // Adicionado log para a resposta de criação de usuário com telefone
}


async function saveLoginBack(login) {
    var url = serverhost + '/login/saveLogin'
    console.log(url);

    var jsonEnvio = {
        "senha": login
    }

    var resposta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(jsonEnvio),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(async response => await response.json())

    console.log("Resposta : ", resposta); // Adicionado log para a resposta de criação de usuário com telefone
}

async function attemptLoginCadastro(login, senha) {
    var url = serverhost + '/login/creation-attempt'
    console.log(url);

    var jsonEnvio = {
        "login": login,
        "senha":senha
    }

    var resposta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(jsonEnvio),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(async response => await response.json())

    let string = JSON.stringify(resposta);

    var objetoJson = JSON.parse(string);

    console.log(objetoJson.resposta); // Adicionado log para a resposta de criação de usuário com telefone

    return objetoJson.resposta;
}