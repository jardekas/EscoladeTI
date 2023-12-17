package escola.ti.controleparental.model.dto.perfil;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PerfilDTO {
    private String email;
    private String telefone;
    private String dataNascimento;
    private String tipoNotificacao;
    private String tipoSenha;
}
