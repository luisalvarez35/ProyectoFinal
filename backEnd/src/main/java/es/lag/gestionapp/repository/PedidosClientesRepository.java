package es.lag.gestionapp.repository;

import es.lag.gestionapp.model.Clientes;
import es.lag.gestionapp.model.PedidosClientes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidosClientesRepository  extends JpaRepository<PedidosClientes, Long> {
}
