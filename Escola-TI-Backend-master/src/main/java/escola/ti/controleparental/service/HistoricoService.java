package escola.ti.controleparental.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import escola.ti.controleparental.model.BloqueioModel;
import escola.ti.controleparental.model.HistoricoModel;
import escola.ti.controleparental.model.HorarioModel;
import escola.ti.controleparental.repository.query.BloqueioQuery;
import escola.ti.controleparental.repository.query.HistoricoQuery;
import escola.ti.controleparental.repository.query.HorarioQuery;

//https://stackoverflow.com/questions/58453768/variables-in-spring-data-jpa-native-query

@Service
public class HistoricoService {
    
    @Autowired
    HistoricoQuery historicoQuery;

    @Autowired
    HorarioQuery horarioQuery;

    @Autowired
    BloqueioQuery bloqueioQuery;

    public List<HistoricoModel> findHistoricoByUserID(int idUser){
        List<HistoricoModel> resposta = historicoQuery.findHistoricoByUserID(idUser);
        return resposta;
    }

    public List<HistoricoModel> findHistoricoByURL(String url){
        List<HistoricoModel> resposta = historicoQuery.findHistoricoByURL(url);
        return resposta;
    }

    public List<HorarioModel> findHorarioByUserIDAndhistoricoID(int idUser, int idHistorico){
        List<HorarioModel> resposta = horarioQuery.findHorarioByUserIDAndhistoricoID(idUser, idHistorico);
        return resposta;
    }

    public List<HorarioModel> findHorarioByUserID(int idUser){
        List<HorarioModel> resposta = horarioQuery.findHorarioByUserID(idUser);
        return resposta;
    }

    public Boolean findIfBloqueado(int idUser, String url){
        List<BloqueioModel> resposta = bloqueioQuery.findIfBloqueado(idUser, url);
        return resposta.isEmpty() ? false : true;
    }

}
