package escola.ti.controleparental.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import escola.ti.controleparental.model.UserModel;
import escola.ti.controleparental.model.dto.RespostaDTO;
import escola.ti.controleparental.model.dto.notificacao.NotificacaoUserDTO;
import escola.ti.controleparental.model.dto.notificacao.SenhaNotUpdateDTO;
import escola.ti.controleparental.model.dto.notificacao.UpdateNotificacaoDTO;
import escola.ti.controleparental.model.dto.user.UserLoginInfoDTO;
import escola.ti.controleparental.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/configuracao")
public class NotificacaoController {

    @Autowired
    private UserRepository userRepository;
    
    @GetMapping(path="/notificacao")
    public ResponseEntity<NotificacaoUserDTO> getAllUsuario(@RequestBody UserLoginInfoDTO body){
        NotificacaoUserDTO notificacaoUserDTO = new NotificacaoUserDTO();

        if(userRepository.findById(body.getIdUser()).isPresent()){
            Optional<UserModel> userModel = userRepository.findById(body.getIdUser());   
            
            notificacaoUserDTO.setTipoRecebimentoNotificacao(userModel.get().getTipoRecebimentoNotificacao());
            notificacaoUserDTO.setTipoRecebimentoSenha(userModel.get().getTipoRecebimentoSenha());

            switch(notificacaoUserDTO.getTipoRecebimentoNotificacao()){
                case 0 : notificacaoUserDTO.setNomeRecebimentoNotificacao("SMS"); break;
                case 1 : notificacaoUserDTO.setNomeRecebimentoNotificacao("Email"); break;
                case 2 : notificacaoUserDTO.setNomeRecebimentoNotificacao("SMS e Email"); break;
                case 3 : notificacaoUserDTO.setNomeRecebimentoNotificacao("Sem notificação"); break;
            }

            notificacaoUserDTO.setNomeRecebimentoSenha(notificacaoUserDTO.getTipoRecebimentoSenha() ? "Email" : "Sms");

            return new ResponseEntity<NotificacaoUserDTO>(notificacaoUserDTO, null, 200);
        }
        else return new ResponseEntity<NotificacaoUserDTO>(null, null, 404);
    }

    @PostMapping(path="/updateNotificacao")
    public ResponseEntity<RespostaDTO> updateNotificacao(@RequestBody UpdateNotificacaoDTO body){
        int httpStatus = 404;
        RespostaDTO resposta = new RespostaDTO();

        if(userRepository.findById(body.getIdUser()).isPresent()){
            Optional<UserModel> userModel = userRepository.findById(body.getIdUser());

            UserModel u = new UserModel(userModel.get().getIdUser(), userModel.get().getEmail(), userModel.get().getTelefone(),
            userModel.get().getDataNascimento(), userModel.get().getTipoRecebimentoSenha(), body.getTipoNotificacao());

            userRepository.save(u);

            resposta.setResposta("Atualização applicada com sucesso!");
            httpStatus = 200;
        }
        else resposta.setResposta("Usuario não encontrado!");
        
        return new ResponseEntity<RespostaDTO>(resposta, null, httpStatus);
    }

    @PostMapping(path="/updateNotSenha")
    public ResponseEntity<RespostaDTO> updateNotificacaoSenha(@RequestBody SenhaNotUpdateDTO body){
        RespostaDTO resposta = new RespostaDTO();
        int httpStatus = 404;

        if(userRepository.findById(body.getIdUser()).isPresent()){
            Optional<UserModel> userModel = userRepository.findById(body.getIdUser());

            UserModel u = new UserModel(userModel.get().getIdUser(), userModel.get().getEmail(), userModel.get().getTelefone(),
            userModel.get().getDataNascimento(), body.getTipoSenha(), userModel.get().getTipoRecebimentoNotificacao());

            userRepository.save(u);

            resposta.setResposta("Atualização aplicada com sucesso!");
            httpStatus = 200;
        }
        else resposta.setResposta("Usuario não encontrado");
        
        return new ResponseEntity<RespostaDTO>(resposta, null, httpStatus);
    }
}
