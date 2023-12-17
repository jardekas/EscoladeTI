package escola.ti.controleparental.model.dto.historico;

import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class HistoricoEnvioDTO {
    private Integer idHistorico;
    private String url;
    private String data;
    private String tempo;
    private Boolean siteBloqueado;
}
