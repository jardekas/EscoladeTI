package escola.ti.controleparental.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import escola.ti.controleparental.model.BloqueioModel;
import escola.ti.controleparental.model.HistoricoModel;
import escola.ti.controleparental.model.dto.RespostaDTO;
import escola.ti.controleparental.model.dto.bloqueio.BloqueioDTO;
import escola.ti.controleparental.model.dto.bloqueio.BloqueioDeleteDTO;
import escola.ti.controleparental.model.dto.bloqueio.BloqueioRespostaDTO;
import escola.ti.controleparental.model.dto.bloqueio.UpdateBloqueioDTO;
import escola.ti.controleparental.model.dto.user.UserLoginInfoDTO;
import escola.ti.controleparental.repository.BloqueioRepository;
import escola.ti.controleparental.repository.HistoricoRepository;
import escola.ti.controleparental.service.BloqueioService;
import escola.ti.controleparental.service.HistoricoService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path="/bloqueio")
public class BloqueioController {

    @Autowired
    private HistoricoRepository historicoRepository;
    
    @Autowired
    private BloqueioRepository bloqueioRepository;

    @Autowired
    private BloqueioService bloqueioService;

    @Autowired
    private HistoricoService historicoService;

    @PostMapping(path="/findOne")
    public ResponseEntity<List<BloqueioRespostaDTO>> oneBloqueio(@RequestBody UserLoginInfoDTO body){
        List<BloqueioRespostaDTO> resposta = new ArrayList<BloqueioRespostaDTO>();
        
        for(BloqueioModel b: bloqueioService.findBloqueioByUserID(body.getIdUser())){

            BloqueioRespostaDTO item = new BloqueioRespostaDTO();

            item.setIdBloqueio(b.getIdBloqueio());
            item.setUrl(b.decodeURL(b.getUrl()));
            item.setHorarioInicio(""+b.getHorarioInicio());
            item.setHorarioFim(""+b.getHorarioFim());
            
            if(b.getDiaInicio() != null && b.getDiaFim() != null){
                LocalDate diaInicio = b.getDiaInicio().toLocalDate();
                LocalDate diaFim = b.getDiaFim().toLocalDate();

                item.setDiaFim(diaFim.getDayOfMonth()+"/"+diaFim.getMonthValue()+"/"+diaFim.getYear());
                item.setDiaInicio(diaInicio.getDayOfMonth()+"/"+diaInicio.getMonthValue()+"/"+diaInicio.getYear());
            }else{
                item.setDiaFim("");
                item.setDiaInicio("");
            }
            resposta.add(item);
        }
        return new ResponseEntity<List<BloqueioRespostaDTO>>(resposta, null, 200);
    }

    @PostMapping(path="/add")
    public ResponseEntity<RespostaDTO> addBloqueio(@RequestBody BloqueioDTO body){
        BloqueioModel bloqueioModel = new BloqueioModel();
        RespostaDTO resposta = new RespostaDTO();

        if(!bloqueioService.findIfAlreadyBlocked(body.getIdUser(), bloqueioModel.encodeURL(body.getUrl()))){

            bloqueioModel.setIdUser(body.getIdUser());
            bloqueioModel.setUrl(bloqueioModel.encodeURL(body.getUrl()));
            bloqueioModel.setHorarioInicio(body.getTempoInicio());
            bloqueioModel.setHorarioFim(body.getTempoFim());
            bloqueioModel.setDiaInicio(body.getDiaInicio());
            bloqueioModel.setDiaFim(body.getDiaFim());

            bloqueioRepository.save(bloqueioModel);

            List<HistoricoModel> h = bloqueioService.findHistoricoByURL(body.getUrl());
            if(!h.isEmpty()){
                h.get(0).setSiteBloqueado(true);
                historicoRepository.save(h.get(0));
            }

            resposta.setResposta("Bloqueio Salvo!");
        }
        else resposta.setResposta("Bloqueio não Salvo");
        
        return new ResponseEntity<RespostaDTO>(resposta, null, 400);
    }

    @PostMapping(path="/delete")
    public ResponseEntity<RespostaDTO> deleteBloqueio(@RequestBody BloqueioDeleteDTO body){
        Optional<BloqueioModel> b = bloqueioRepository.findById(body.getIdBloqueio());
        RespostaDTO resposta = new RespostaDTO();

        for(HistoricoModel h : historicoService.findHistoricoByURL(b.get().decodeURL(b.get().getUrl()))){
            h.setSiteBloqueado(false);
            historicoRepository.save(h);
        }

        bloqueioRepository.deleteById(body.getIdBloqueio());

        resposta.setResposta("Bloqueio Deletado");

        return new ResponseEntity<RespostaDTO>(resposta, null, 200);
    }

    @PostMapping(path="/update")
    public ResponseEntity<RespostaDTO> updateBloqueio (@RequestBody UpdateBloqueioDTO body){
        BloqueioModel bloqueioModel = new BloqueioModel();
        RespostaDTO resposta = new RespostaDTO();

        for(BloqueioModel b : bloqueioRepository.findAll()){
            if(b.getIdBloqueio() == body.getIdBloqueio()){
                bloqueioModel = b;
                break;
            }
        }

        if(body.getDiaInicio() != null)
            bloqueioModel.setDiaInicio(body.getDiaInicio());
        
        if(body.getDiaFim() != null)
            bloqueioModel.setDiaFim(body.getDiaFim());
        
        if(body.getTempoFim() != null)
            bloqueioModel.setHorarioFim(body.getTempoFim().strip());
        
        if(body.getTempoInicio() != null)
            bloqueioModel.setHorarioInicio(body.getTempoInicio().strip());

        if(body.getUrl() != null)
            bloqueioModel.setUrl(body.getUrl());

        bloqueioRepository.save(bloqueioModel);

        resposta.setResposta("Bloqueio Atualizado");

        return new ResponseEntity<RespostaDTO>(resposta, null, 200);
    }

}
