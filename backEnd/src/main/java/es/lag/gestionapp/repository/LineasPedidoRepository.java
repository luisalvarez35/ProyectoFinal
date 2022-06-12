package es.lag.gestionapp.repository;

import es.lag.gestionapp.model.Clientes;
import es.lag.gestionapp.model.LineasPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LineasPedidoRepository extends JpaRepository<LineasPedido, Long> {

    @Query("select l from LineasPedido l where l.pedidosClientes.id = ?1")
    public List<LineasPedido> findByIdPedido(Long id);


}
