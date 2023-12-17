package escola.ti.controleparental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import escola.ti.controleparental.model.UserModel;
import escola.ti.controleparental.model.dto.RespostaDTO;
import escola.ti.controleparental.model.dto.configuracao.FeedbackDTO;
import escola.ti.controleparental.model.dto.configuracao.UpdateUserDTO;
import escola.ti.controleparental.model.dto.user.EmailDTO;
import escola.ti.controleparental.model.util.EmailSenderService;
import escola.ti.controleparental.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/configuracao")
public class ConfiguracaoController {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    EmailSenderService emailSenderService;

    @PostMapping(path="/update")
    public ResponseEntity<RespostaDTO> updateUserInfo(@RequestBody UpdateUserDTO body){
            UserModel update = userRepository.findById(body.getIdUser()).get();
            boolean passou = false;
            RespostaDTO resposta = new RespostaDTO();

            if(!body.getEmail().isEmpty() && !body.getEmail().equals(null) && !body.getEmail().equals(""))
                if(!body.getEmail().equals(update.getEmail())){
                    update.setEmail(body.getEmail()); 
                    passou = true;   
                }
                
            if(!body.getTelefone().isEmpty() && !body.getTelefone().equals(null) && !body.getTelefone().equals(""))
                if(!body.getTelefone().equals(update.getTelefone())){
                    update.setTelefone(body.getTelefone());
                    passou = true;
                }

            if((body.getNotificacao() != null) && (body.getNotificacao() < 4 && body.getNotificacao() >= 0))
                if(body.getNotificacao() != update.getTipoRecebimentoNotificacao()){
                    update.setTipoRecebimentoNotificacao(body.getNotificacao());
                    passou = true;
                }
                    
            if(body.getSenha() != null && body.getSenha() != update.getTipoRecebimentoSenha()){
                update.setTipoRecebimentoSenha(body.getSenha());
                passou = true;
            }
                
            if(passou)
                userRepository.save(update);
            
        resposta.setResposta("Criado com sucesso...");

        return new ResponseEntity<RespostaDTO>(resposta, null, 200);
    }

    @PostMapping(path="/feedback")
    public ResponseEntity<RespostaDTO> enviarFeedback(@RequestBody FeedbackDTO body){
        EmailDTO email = new EmailDTO();
        RespostaDTO resposta = new RespostaDTO();

        email.setRecepient("escola.ti.controle.parental@gmail.com");

        emailSenderService.sendSimpleEmail(email, body.getFeedback(), "Feedback");
        
        resposta.setResposta("Criado com sucesso...");

        return new ResponseEntity<RespostaDTO>(resposta, null, 200);
    }
}
