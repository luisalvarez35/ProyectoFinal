package es.lag.gestionapp.repository;

import es.lag.gestionapp.model.Categorias;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriasRepository extends JpaRepository<Categorias, Long> {
}
