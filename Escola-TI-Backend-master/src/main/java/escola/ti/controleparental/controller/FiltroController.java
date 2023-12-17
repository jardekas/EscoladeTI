package escola.ti.controleparental.controller;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import escola.ti.controleparental.model.BloqueioModel;
import escola.ti.controleparental.model.HistoricoModel;
import escola.ti.controleparental.model.HorarioModel;
import escola.ti.controleparental.model.dto.bloqueio.BloqueioRespostaDTO;
import escola.ti.controleparental.model.dto.filtro.FiltroDTO;
import escola.ti.controleparental.model.dto.historico.HistoricoEnvioDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import escola.ti.controleparental.repository.BloqueioRepository;
import escola.ti.controleparental.repository.HistoricoRepository;
import escola.ti.controleparental.service.HistoricoService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/filtro")
public class FiltroController {
    
    @Autowired
    private HistoricoRepository historicoRepository;

    @Autowired
    private BloqueioRepository bloqueioRepository;

    @Autowired
    private HistoricoService historicoService;

    @PostMapping(path="/bloqueio")
    public ResponseEntity<List<BloqueioRespostaDTO>> filtroBloqueio(@RequestBody FiltroDTO body){
        List<BloqueioRespostaDTO> resposta = new ArrayList<>();

        for(BloqueioModel b : bloqueioRepository.findAll()){
            BloqueioRespostaDTO item = new BloqueioRespostaDTO();

            if(body.getFiltro().equals(b.getDiaFim()+"") || body.getFiltro().equals(b.getDiaInicio()+"")){
                LocalDate dataFim = b.getDiaFim().toLocalDate();
                LocalDate dataInicio = b.getDiaInicio().toLocalDate();

                item.setDiaFim(dataFim.getDayOfMonth()+"/"+dataFim.getMonthValue()+"/"+dataFim.getYear());
                item.setDiaInicio(dataInicio.getDayOfMonth()+"/"+dataInicio.getMonthValue()+"/"+dataInicio.getYear());
                item.setHorarioFim(b.getHorarioFim());
                item.setHorarioInicio(b.getHorarioInicio());
                item.setIdBloqueio(b.getIdBloqueio());
                item.setUrl(b.getUrl());

                resposta.add(item);
            }
        }

        return new ResponseEntity<List<BloqueioRespostaDTO>>(resposta, null, 200);
    }

    @PostMapping(path="/historico")
    public ResponseEntity<List<HistoricoEnvioDTO>> filtroHistorico(@RequestBody List<FiltroDTO> body){
        List<HistoricoEnvioDTO> resposta = new ArrayList<>();

        for(HistoricoModel h: historicoRepository.findAll()){
            for(HorarioModel ho : historicoService.findHorarioByUserID(h.getIdUser())){
                HistoricoEnvioDTO item = new HistoricoEnvioDTO();

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

                for(var i = 0; i< body.size(); i++){
                    if(body.get(i).getFiltro().equals(offsetDateTime.getHour()+":"+offsetDateTime.getMinute()) || body.get(i).getFiltro().equals(offsetDateTime.getDayOfMonth()+" de "+mes+" de "+offsetDateTime.getYear())
                     || body.get(i).getFiltro().equals(h.getSiteBloqueado() ? "SIM" : "NAO")){
                        item.setData(offsetDateTime.getDayOfMonth()+" de "+mes+" de "+offsetDateTime.getYear());
                        item.setTempo(offsetDateTime.getHour()+":"+offsetDateTime.getMinute());
                        item.setSiteBloqueado(h.getSiteBloqueado());
                        item.setIdHistorico(h.getIdHistorico());
                        item.setUrl(h.decodeURL(h.getUrl()));

                        resposta.add(item);
                    }

                }
            }
        }

        return new ResponseEntity<List<HistoricoEnvioDTO>>(resposta, null, 200);
    }
    
}
