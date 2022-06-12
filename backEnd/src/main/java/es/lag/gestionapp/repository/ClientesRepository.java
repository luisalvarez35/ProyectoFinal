package es.lag.gestionapp.repository;

import es.lag.gestionapp.model.Clientes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientesRepository extends JpaRepository<Clientes, Long> {
}
