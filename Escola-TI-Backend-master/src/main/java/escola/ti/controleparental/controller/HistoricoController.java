package escola.ti.controleparental.controller;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import escola.ti.controleparental.model.HistoricoModel;
import escola.ti.controleparental.model.HorarioModel;
import escola.ti.controleparental.model.dto.RespostaDTO;
import escola.ti.controleparental.model.dto.historico.HistoricoEnvioDTO;
import escola.ti.controleparental.model.dto.historico.HistoricoPostDTO;
import escola.ti.controleparental.model.dto.historico.TimerDTO;
import escola.ti.controleparental.model.dto.user.UserLoginInfoDTO;
import escola.ti.controleparental.repository.HistoricoRepository;
import escola.ti.controleparental.repository.HorarioRepository;
import escola.ti.controleparental.service.HistoricoService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path="/historico")
public class HistoricoController {
    
    @Autowired
    private HistoricoRepository historicoRepository;

    @Autowired
    private HorarioRepository horarioRepository;

    @Autowired
    private HistoricoService historicoService;

    @PostMapping(path="/all")
    public ResponseEntity<List<HistoricoEnvioDTO>> getUserHistorico(@RequestBody UserLoginInfoDTO body ){
        List<HistoricoEnvioDTO> lista = new ArrayList<HistoricoEnvioDTO>();

        List<HistoricoModel> listaHistorico = historicoService.findHistoricoByUserID(body.getIdUser());
        List<HorarioModel> listaHorario = historicoService.findHorarioByUserID(body.getIdUser());

        for(HorarioModel ho : listaHorario){
            for(HistoricoModel hi : listaHistorico){
                if(ho.getIdHistorico().equals(hi.getIdHistorico()) && ho.getHorarioDeAcesso() != null){

                    HistoricoEnvioDTO resposta = new HistoricoEnvioDTO();  

                    String dateString = ho.getHorarioDeAcesso();
                    DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

                    OffsetDateTime offsetDateTime = OffsetDateTime.parse(dateString,formatter);

                    String mes = null;

                    switch(offsetDateTime.getMonthValue()){
                        case 1 : mes = "Janeiro"; break;
                        case 2 : mes = "Fevereiro"; break;
                        case 3 : mes = "Março"; break;
                        case 4 : mes = "Abril"; break;
                        case 5 : mes = "Maio"; break;
                        case 6 : mes = "Junho"; break;
                        case 7 : mes = "Julho"; break;
                        case 8 : mes = "Agosto"; break;
                        case 9 : mes = "Setembro"; break;
                        case 10 : mes = "Outubro"; break;
                        case 11 : mes = "Novembro"; break;
                        case 12 : mes = "Dezembro"; break;
                    }

                    resposta.setIdHistorico(hi.getIdHistorico());
                    resposta.setUrl(hi.decodeURL(hi.getUrl()));
                    resposta.setData(offsetDateTime.getDayOfMonth()+" de "+mes+" de "+offsetDateTime.getYear());
                    resposta.setTempo(offsetDateTime.getHour()+":"+offsetDateTime.getMinute());
                    resposta.setSiteBloqueado(hi.getSiteBloqueado());

                    lista.add(resposta);
                }
            }
        }      
            
        return new ResponseEntity<List<HistoricoEnvioDTO>>(lista, null, 200);
        
    }

    @PostMapping(path="/save")
    public ResponseEntity<RespostaDTO> saveUserHistorico(@RequestBody HistoricoPostDTO body) {
        Boolean passou = false;
        Integer idHorario = null;
        RespostaDTO resposta = new RespostaDTO();
        int httpStatus = 400;

        List<HistoricoModel> listaHistorico = historicoService.findHistoricoByUserID(body.getIdUser());

        for(HistoricoModel h : listaHistorico){
            if(h.getUrl().equals(body.getUrl())){
                HorarioModel novoHorario = new HorarioModel();

                novoHorario.setHorarioDeAcesso(body.getHorario());
                novoHorario.setIdHistorico(h.getIdHistorico());
                novoHorario.setIdUser(body.getIdUser());

                HorarioModel save = horarioRepository.save(novoHorario);
                passou = true;
                idHorario = save.getIdHorario();
            }
        }

        if(!passou){
            HistoricoModel novoHistorico = new HistoricoModel();

            novoHistorico.setIdUser(body.getIdUser());
            novoHistorico.setSiteBloqueado(historicoService.findIfBloqueado(body.getIdUser(), body.getUrl()));
            novoHistorico.setUrl(body.getUrl());
            
            HistoricoModel save = historicoRepository.save(novoHistorico);

            HorarioModel novoHorario = new HorarioModel();

            novoHorario.setHorarioDeAcesso(body.getHorario());
            novoHorario.setIdHistorico(save.getIdHistorico());
            novoHorario.setIdUser(body.getIdUser());

            HorarioModel saveH = horarioRepository.save(novoHorario);
            
            idHorario = saveH.getIdHorario();
        }
        
        if(idHorario!=null){
            resposta.setResposta(idHorario+"");
            httpStatus = 200;
        }
        else resposta.setResposta(idHorario+"");
            
        return new ResponseEntity<RespostaDTO>(resposta, null, httpStatus);
    }

    @PostMapping(path="/set-time")
    public ResponseEntity<RespostaDTO> setTimerHorario(@RequestBody TimerDTO body) {
        Optional<HorarioModel> h = horarioRepository.findById(body.getIdHorario());
        RespostaDTO resposta = new RespostaDTO();

        h.get().setTempoAtivo(body.getTempo());

        horarioRepository.save(h.get());

        resposta.setResposta("Sucesso");

        return new ResponseEntity<RespostaDTO>(resposta, null, 200);
    }
    

}
