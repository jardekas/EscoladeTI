package escola.ti.controleparental.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="tb_horario")
@NoArgsConstructor
public class HorarioModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_horario")
    @Getter
    @Setter
    private Integer idHorario;

    @Column(name="id_user")
    @Getter
    @Setter
    private Integer idUser;

    @Column(name="id_historico")
    @Getter
    @Setter
    private Integer idHistorico;

    @Column(name="horario")
    @Getter
    @Setter
    private String horarioDeAcesso;

    @Column(name="tempo_ativo")
    @Getter
    @Setter
    private String tempoAtivo;
}
