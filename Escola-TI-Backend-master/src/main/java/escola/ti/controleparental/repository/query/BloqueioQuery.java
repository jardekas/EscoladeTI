package escola.ti.controleparental.repository.query;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import escola.ti.controleparental.model.BloqueioModel;

@Repository
public interface BloqueioQuery extends JpaRepository<BloqueioModel, Integer>{

    @Query(value="select * from tb_bloqueio b where b.id_user = :idUser and b.url = :url", nativeQuery=true)
    public List<BloqueioModel> findIfBloqueado(@Param("idUser") int idUser, @Param("url") String url);

    @Query(value="select * from tb_bloqueio b where b.id_user = :idUser", nativeQuery=true)
    public List<BloqueioModel> findBloqueioByUserID(@Param("idUser") int idUser);

}
