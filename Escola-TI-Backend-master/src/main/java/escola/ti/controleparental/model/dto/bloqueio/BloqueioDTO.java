package escola.ti.controleparental.model.dto.bloqueio;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class BloqueioDTO {
    private Integer idUser;
    private String url;
    private Date diaInicio;
    private Date diaFim;
    private String tempoInicio;
    private String tempoFim;
}
