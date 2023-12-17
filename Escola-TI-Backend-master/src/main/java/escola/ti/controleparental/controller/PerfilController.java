package escola.ti.controleparental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import escola.ti.controleparental.model.UserModel;
import escola.ti.controleparental.model.dto.perfil.PerfilDTO;
import escola.ti.controleparental.model.dto.user.UserLoginInfoDTO;
import escola.ti.controleparental.repository.UserRepository;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/perfil")
public class PerfilController {
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping(path="/getInfo")
    public ResponseEntity<PerfilDTO> getInfoUser(@RequestBody UserLoginInfoDTO body){
        PerfilDTO resposta = new PerfilDTO();

        System.out.println(body.getIdUser());

        for(UserModel u : userRepository.findAll()){
            if(u.getIdUser().equals(body.getIdUser())){
                resposta.setDataNascimento(u.getDataNascimento()+"");
                resposta.setEmail(u.getEmail());
                resposta.setTelefone(u.getTelefone());

                switch(u.getTipoRecebimentoNotificacao()){
                    case 0 : resposta.setTipoNotificacao("SMS"); break;
                    case 1 : resposta.setTipoNotificacao("Email"); break;
                    case 2 : resposta.setTipoNotificacao("SMS e Email"); break;
                    case 3 : resposta.setTipoNotificacao("Sem notificação"); break;
                }
                
                resposta.setTipoSenha(u.getTipoRecebimentoSenha() ? "Email" : "Sms");
            }
        }

        return new ResponseEntity<PerfilDTO>(resposta, null, 200);
    }
}
