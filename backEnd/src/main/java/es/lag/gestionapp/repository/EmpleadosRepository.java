package es.lag.gestionapp.repository;

import es.lag.gestionapp.model.Empleados;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpleadosRepository extends JpaRepository<Empleados, Long> {
}
