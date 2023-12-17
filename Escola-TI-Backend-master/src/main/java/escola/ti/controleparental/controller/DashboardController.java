package escola.ti.controleparental.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import escola.ti.controleparental.model.dto.dashboard.BarChartDTO;
import escola.ti.controleparental.model.dto.dashboard.BarChartVerticalDTO;
import escola.ti.controleparental.model.dto.dashboard.CardDTO;
import escola.ti.controleparental.model.dto.dashboard.DoughnutDTO;
import escola.ti.controleparental.model.dto.dashboard.LineChartDTO;
import escola.ti.controleparental.model.dto.user.UserLoginInfoDTO;
import escola.ti.controleparental.service.DashboardService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path="/dashboard")
public class DashboardController {

    @Autowired 
    private DashboardService dashboardService;

    // QTD / MES 

    @PostMapping(path="/bar-chart")
    public ResponseEntity<List<BarChartDTO>> barStats(@RequestBody UserLoginInfoDTO body){
        List<BarChartDTO> lista = new ArrayList<>();

        for(int i = 1; i <= 12; i++){
            if(dashboardService.dashboardGroupByDataMes(body.getIdUser(), i+"")!=null){
                BarChartDTO bar = new BarChartDTO(i, Integer.parseInt(dashboardService.dashboardGroupByDataMes(body.getIdUser(), i+"")));  
                lista.add(bar); 
            }
        }
         
        return new ResponseEntity<List<BarChartDTO>>(lista, null, 200);
    }

    // Horarios mais acessados

    @PostMapping(path="/doughnut-chart")
    public ResponseEntity<List<DoughnutDTO>> doughnutStats(@RequestBody UserLoginInfoDTO body){
        List<DoughnutDTO> lista = new ArrayList<>();
        
        for(int i = 1; i <= 4; i++){
            DoughnutDTO resposta = dashboardService.dashboardGroupByHorario(body.getIdUser(), i);

            if( resposta.getHorario() != null && resposta.getTotal() != null)
                lista.add(resposta);
            
        }
        
        return new ResponseEntity<List<DoughnutDTO>>(lista, null, 200);
    }

    // Maior acessado + QTD tempo + URL

    @PostMapping(path="/card")
    public ResponseEntity<CardDTO> cardStats(@RequestBody UserLoginInfoDTO body){
        CardDTO resposta = dashboardService.findHorarioMostViwed(body.getIdUser());
        
        return new ResponseEntity<CardDTO>(resposta, null, 200);
    }

    // % de bloqueado e não bloqueado

    @PostMapping(path="/bar-chart-vertical")
    public ResponseEntity<List<BarChartVerticalDTO>> barChartVerticalStats(@RequestBody UserLoginInfoDTO body){
        List<BarChartVerticalDTO> resposta = dashboardService.dashboardGroupBySiteBloqueado(body.getIdUser());

        return new ResponseEntity<List<BarChartVerticalDTO>>(resposta, null, 200);
    }

    // Tempo Gasto por semana

    @PostMapping(path="/line-chart")
    public ResponseEntity<List<LineChartDTO>> lineChartStats(@RequestBody UserLoginInfoDTO body){
        List<LineChartDTO> resposta = new ArrayList<>();

        for(int i = 1; i<=12; i++){
            LineChartDTO item = new LineChartDTO();
            item = dashboardService.dashboardTempoPorSemana(body.getIdUser(), i+"");

            if(item.getQtdHoras()!=null)
                resposta.add(item);
        }
     
        return new ResponseEntity<List<LineChartDTO>>(resposta, null, 200);
    }
    }
