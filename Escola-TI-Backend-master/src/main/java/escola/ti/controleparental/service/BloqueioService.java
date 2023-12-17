package escola.ti.controleparental.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import escola.ti.controleparental.model.BloqueioModel;
import escola.ti.controleparental.model.HistoricoModel;
import escola.ti.controleparental.repository.query.BloqueioQuery;
import escola.ti.controleparental.repository.query.HistoricoQuery;

//https://stackoverflow.com/questions/58453768/variables-in-spring-data-jpa-native-query

@Service
public class BloqueioService {
    
    @Autowired
    HistoricoQuery historicoQuery;

    @Autowired
    BloqueioQuery bloqueioQuery;

    public List<HistoricoModel> findHistoricoByURL(String url){
        List<HistoricoModel> resposta = historicoQuery.findHistoricoByURL(url);
        return resposta;
    }

    public List<BloqueioModel> findBloqueioByUserID(int idUser){
        List<BloqueioModel> resposta = bloqueioQuery.findBloqueioByUserID(idUser);
        return resposta;
    }

    public Boolean findIfAlreadyBlocked(int idUser, String url){
        List<BloqueioModel> resposta = bloqueioQuery.findIfBloqueado(idUser, url);
        return resposta.isEmpty() ? false : true;
    }
}
