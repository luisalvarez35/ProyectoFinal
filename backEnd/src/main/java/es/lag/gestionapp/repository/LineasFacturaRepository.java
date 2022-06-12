package es.lag.gestionapp.repository;


import es.lag.gestionapp.model.LineasFactura;
import es.lag.gestionapp.model.LineasPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LineasFacturaRepository extends JpaRepository<LineasFactura, Long> {

    @Query("select l from LineasFactura l where l.facturas.id = ?1")
    public List<LineasFactura> findByIdFactura(Long id);
}