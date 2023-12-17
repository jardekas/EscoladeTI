package escola.ti.controleparental.model.dto.configuracao;

import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class UpdateUserDTO {
    private Integer idUser;
    private String email;
    private String telefone;
    private Integer notificacao;
    private Boolean senha;
}
