package escola.ti.controleparental.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import escola.ti.controleparental.model.HistoricoModel;
import escola.ti.controleparental.model.dto.dashboard.BarChartVerticalDTO;
import escola.ti.controleparental.model.dto.dashboard.CardDTO;
import escola.ti.controleparental.model.dto.dashboard.DoughnutDTO;
import escola.ti.controleparental.model.dto.dashboard.LineChartDTO;
import escola.ti.controleparental.repository.query.BloqueioQuery;
import escola.ti.controleparental.repository.query.HistoricoQuery;
import escola.ti.controleparental.repository.query.HorarioQuery;

@Service
public class DashboardService {
    @Autowired
    HistoricoQuery historicoQuery;

    @Autowired
    HorarioQuery horarioQuery;

    @Autowired
    BloqueioQuery bloqueioQuery;

    public String dashboardGroupByDataMes(@Param("idUser") int idUser, @Param("data") String data){
        LocalDate day = new LocalDate();
        
        if(Integer.parseInt(data)<10)
            data = day.getYear()+"-0"+data+"%";
        else
            data = day.getYear()+"-"+data+"%";

        System.out.println(data);

        String resposta = historicoQuery.dashboardGroupByDataMes(idUser, data);

        return resposta;
    }

    public DoughnutDTO dashboardGroupByHorario(@Param("idUser") int idUser, @Param("horario") int data){
        DoughnutDTO resposta = new DoughnutDTO();

        int inicio = 0;
        int horario = 0;
        String envio;

        for(int i = 0; i < 6; i++){

            if(data == 1){
                horario = i;
            }else if(data == 2){
                horario = i+6;
                inicio = 6;
            }else if(data == 3){
                horario = i+12;
                inicio = 12;
            }else if(data == 4){
                horario = i+18;
                inicio = 18;
            }
            

            if(horario < 10)
                envio = "%T0"+horario+"%";
            else
                envio = "%T"+horario+"%";
            
            Integer query = historicoQuery.dashboardGroupByHorario(idUser, envio);


            if(query != null){

                resposta.setHorario(inicio+"H até "+(horario)+"H");

                if(resposta.getTotal() == null){
                    resposta.setTotal(query);
                }
                else resposta.setTotal(resposta.getTotal()+query);

            }
            
        }

        return resposta;
    }

    public CardDTO findHorarioMostViwed(@Param("idUser") int idUser){
        List<String> query = horarioQuery.findHorarioMostViwed(idUser);
        boolean primeiro = true;
        CardDTO item = new CardDTO();

        for(String txt : query){

            if(txt != null){

                txt += "";

                String[] res = txt.split("[,]",0);

                if(primeiro){
                    item.setTempoAcesso(res[2]);
                    item.setQtdAcesso(Integer.parseInt(res[1]));

                    Optional<HistoricoModel> h = historicoQuery.findById(Integer.parseInt(res[0]));

                    if(h.isPresent())
                    item.setUrl(h.get().getUrl());

                    primeiro = false;
                }
                else if(item.getTempoAcesso() != null && !res[2].equals("null")){
                    if(Float.parseFloat(item.getTempoAcesso()) < Float.parseFloat(res[2])){
                        item.setTempoAcesso(res[2]);
                        item.setQtdAcesso(Integer.parseInt(res[1]));

                        Optional<HistoricoModel> h = historicoQuery.findById(Integer.parseInt(res[0]));

                        if(h.isPresent())
                        item.setUrl(h.get().getUrl());

                    }
                }
            }
        }

        return item;
    }

    public List<BarChartVerticalDTO> dashboardGroupBySiteBloqueado(@Param("idUser") int idUser){

        List<String> query = historicoQuery.dashboardGroupBySiteBloqueado(idUser);
        List<BarChartVerticalDTO> lista = new ArrayList<>();

        for(String txt : query){
            if(txt != null){
                String[] res = txt.split("[,]",0);

                BarChartVerticalDTO item = new BarChartVerticalDTO();

                item.setBloquado(Boolean.valueOf(res[0]));
                item.setQtdTotal(Integer.parseInt(res[1]));

                lista.add(item);
            }
        }

        return lista;
    }

    public LineChartDTO dashboardTempoPorSemana(@Param("idUser") int idUser, @Param("info") String data){
        LineChartDTO resposta = new LineChartDTO();
        LocalDate day = new LocalDate();

        resposta.setMes(Integer.parseInt(data));

        if(resposta.getMes() < 10)
            data = day.getYear()+"-0"+data+"%";
        else
            data = day.getYear()+"-"+data+"%";

        Float query = horarioQuery.dashboardTempoPorSemana(idUser, data);

        if(query != null)
        resposta.setQtdHoras(query);

        return resposta;
    }
}
