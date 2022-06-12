package es.lag.gestionapp.repository;

import es.lag.gestionapp.model.Facturas;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacturasRepository extends JpaRepository<Facturas, Long> {
}
