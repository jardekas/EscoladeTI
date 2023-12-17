package escola.ti.controleparental.repository.query;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import escola.ti.controleparental.model.HistoricoModel;

@Repository
public interface HistoricoQuery extends JpaRepository<HistoricoModel, Integer>{

    @Query(value="select * from tb_historico h where h.id_user = :idUser", nativeQuery=true)
    public List<HistoricoModel> findHistoricoByUserID(@Param("idUser") int idUser);

    @Query(value="select * from tb_historico h where h.url = :url", nativeQuery=true)
    public List<HistoricoModel> findHistoricoByURL(@Param("url") String url);

    @Query(value="select Count(h.horario) from tb_horario h where h.id_user = :idUser and h.horario like :ano group by h.id_user;", nativeQuery=true)
    public String dashboardGroupByDataMes(@Param("idUser") int idUser, @Param("ano") String data);
    
    @Query(value="select Count(h.horario) from tb_horario h where h.id_user = :idUser and h.horario like :hora group by h.id_user;", nativeQuery=true)
    public Integer dashboardGroupByHorario(@Param("idUser") int idUser, @Param("hora") String data);

    @Query(value="select hi.site_bloqueado, count(ho.horario) from tb_horario ho inner join tb_historico hi on ho.id_historico = hi.id_historico where ho.id_user = :idUser group by hi.site_bloqueado;", nativeQuery=true)
    public List<String> dashboardGroupBySiteBloqueado(@Param("idUser") int idUser);

}
