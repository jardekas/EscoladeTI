package escola.ti.controleparental.controller;

import escola.ti.controleparental.model.UserModel;
import escola.ti.controleparental.model.dto.RespostaDTO;
import escola.ti.controleparental.model.dto.user.DeleteUserDTO;
import escola.ti.controleparental.model.dto.user.EmailUserDTO;
import escola.ti.controleparental.model.dto.user.TelUserDTO;
import escola.ti.controleparental.model.dto.user.UpdateUserEmailDTO;
import escola.ti.controleparental.model.dto.user.UpdateUserTelDTO;
import escola.ti.controleparental.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // TELEFONE ------------------------------------------------------------------

    // CREATE
    @PostMapping(path="/addT") // Define o caminho onde vai ser feito a requesição (no caso localhost:8080/addT)
    public ResponseEntity<RespostaDTO> addNewUserT(@RequestBody TelUserDTO body){ 
        //body.getDataNascimento().setDate(body.getDataNascimento().getDate()+1); // Tive que fazer isso pois estava sempre definindo um dia antes
        boolean existe = false;
        RespostaDTO resposta = new RespostaDTO();
        int httpStatus = 409;

        String dateString = body.getDataNascimento();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSX");

        OffsetDateTime offsetDateTime = OffsetDateTime.parse(dateString,formatter);

        for(UserModel u : userRepository.findAll())
            existe = body.getTelefone().equals(u.getTelefone()) ? true : false; // Verifica se ja existe no banco

        if(!existe){
            UserModel u = new UserModel(); // Cria um objeto do tipo UserModel, o user model é uma modelo de como é no banco, para não ter problema de tipos
            
            u.setTelefone(body.getTelefone()); // Se define o que for nescessario no objeto que foi iniciada a cima
            u.setDataNascimento(offsetDateTime.toLocalDateTime());
            u.setTipoRecebimentoNotificacao(0); // valor que vai de 0 a 3, 0 - SMS
            u.setTipoRecebimentoSenha(false); // se é false ele recebe por SMS
            // ...

            userRepository.save(u); // salva o objeto modelo no banco    

            resposta.setResposta("Criado com sucesso...");// O retorno ao usuario, trazendo de volta o que foi enviado e o protocolo HTTP em JSON
            httpStatus = 200;
        }
        else resposta.setResposta("Telefone já registrado...");
        
        return new ResponseEntity<RespostaDTO>(resposta, null, httpStatus);

        /*  É feito um caminho em um Post
            inicio > pathing(PostMapping) > RequestBody(o que vai ser enviado pelo usuario) > ResponseEntity (o que o back vai trazer de resposta ao usuario)

            O usuario envia uma informação no path definido, essa informação é armazenada no RequestBody, essa informação é utilizada pela função e salva/atualizada/deletada
            no banco utilizando o repository, e uma resposta é enviada de volta ao usuario/front (objeto, headers, protocoloHTTP)
         */
    }

    // UPDATE

    @PostMapping(path="/updateT")
    public ResponseEntity<RespostaDTO> updateUserTel(@RequestBody UpdateUserTelDTO body){
        boolean existe = false;
        RespostaDTO resposta = new RespostaDTO();
        int httpStatus = 409;

        for(UserModel u : userRepository.findAll())
            existe = body.getTelefone().equals(u.getTelefone()) ? true : false; 

        if(!existe){
            UserModel update = userRepository.findById(body.getId()).get();// Salva as informações do banco no objeto (id/email/telefone)

            update.setTelefone(body.getTelefone()); // Modifica o valor do objeto    

            userRepository.save(update); // Salva de volta no banco, ja que no objeto ja tem o id ele atualiza aquele id no banco, assim sendo o mesmo comando de criação

            resposta.setResposta("Atualizado com sucesso..");
            httpStatus = 200;
        }
        else resposta.setResposta("Telefone ja registrado...");
        
        return new ResponseEntity<RespostaDTO>(resposta, null, httpStatus);
    }

    // EMAIL ------------------------------------------------------------------

    @PostMapping(path="/addE")
    public ResponseEntity<RespostaDTO> addNewUserE(@RequestBody EmailUserDTO body){
        //body.getDataNascimento().setDate(body.getDataNascimento().getDate()+1);
        boolean existe = false;
        RespostaDTO resposta = new RespostaDTO();
        int httpStatus = 409;

        String dateString = body.getDataNascimento();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSX");

        OffsetDateTime offsetDateTime = OffsetDateTime.parse(dateString,formatter);

        for(UserModel u : userRepository.findAll())
           existe = body.getEmail().equals(u.getEmail()) ? true : false;
        
        if(!existe){
            UserModel u = new UserModel();

            u.setEmail(body.getEmail());
            u.setDataNascimento(offsetDateTime.toLocalDateTime());
            u.setTipoRecebimentoNotificacao(1); // valor que vai de 0 a 3, 1 - Email
            u.setTipoRecebimentoSenha(true); // se é true ele recebe por email

            userRepository.save(u);  
            resposta.setResposta("Criado com sucesso...");  
            httpStatus = 200;
        }
        else resposta.setResposta("Email ja registrado...");
        
        return new ResponseEntity<RespostaDTO>(resposta, null, httpStatus);

    }   

    @PostMapping(path="/updateE")
    public ResponseEntity<RespostaDTO> updateUserEmail(@RequestBody UpdateUserEmailDTO body){
        boolean existe = false;
        RespostaDTO resposta = new RespostaDTO();
        int httpStatus = 409;

        for(UserModel u : userRepository.findAll())
            existe = body.getEmail().equals(u.getEmail()) ? true : false;

        if(!existe){
            UserModel u = userRepository.findById(body.getId()).get();

            u.setEmail(body.getEmail()); 

            userRepository.save(u); 
            resposta.setResposta("Atualizado com sucesso");
            httpStatus = 200;
        }
        else resposta.setResposta("Email já registrado");
        
        return new ResponseEntity<RespostaDTO>(resposta, null, httpStatus);
    }

    // DELETE USER funciona tanto com telefone quanto email

    @PostMapping(path="/deleteU")
    public ResponseEntity<DeleteUserDTO> deleteUser(@RequestBody DeleteUserDTO body){
        userRepository.deleteById(body.getId());

        return new ResponseEntity<DeleteUserDTO>(body, null, 200); // Retorno de confirmação.
    }

    @GetMapping(path="/user")
    public @ResponseBody Iterable<UserModel> getAllUsers(){
        return userRepository.findAll();
    }

}