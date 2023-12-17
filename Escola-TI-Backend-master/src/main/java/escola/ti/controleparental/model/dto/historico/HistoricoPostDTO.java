package escola.ti.controleparental.model.dto.historico;

import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class HistoricoPostDTO {
    private Integer idUser;
    private String url;
    private String horario;
    private Boolean bloqueado;
}
