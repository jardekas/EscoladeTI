package escola.ti.controleparental.repository.query;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import escola.ti.controleparental.model.HorarioModel;


@Repository
public interface HorarioQuery extends JpaRepository<HorarioModel, Integer>{

    @Query(value="select * from tb_horario h where h.id_user = :idUser and h.id_historico = :idHistorico", nativeQuery=true)
    public List<HorarioModel> findHorarioByUserIDAndhistoricoID(@Param("idUser") int idUser, @Param("idHistorico") int idHistorico);

    @Query(value="select * from tb_horario h where h.id_user = :idUser", nativeQuery=true)
    public List<HorarioModel> findHorarioByUserID(@Param("idUser") int idUser);

    @Query(value="select h.id_historico, count(h.horario) as total_acessado, sum(h.tempo_ativo) as total_tempo from tb_horario h where h.id_user = :idUser group by h.id_historico;", nativeQuery=true)
    public List<String> findHorarioMostViwed(@Param("idUser") int idUser);
    
    @Query(value="select sum(h.tempo_ativo) from tb_horario h where h.id_user = :idUser and h.horario like :info", nativeQuery=true)
    public Float dashboardTempoPorSemana(@Param("idUser") int idUser, @Param("info") String dia);
}
