package es.lag.gestionapp.repository;

import es.lag.gestionapp.model.Productos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductosRepository extends JpaRepository<Productos, Long> {
}
