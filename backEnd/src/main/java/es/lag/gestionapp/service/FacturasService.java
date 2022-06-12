package es.lag.gestionapp.service;

import es.lag.gestionapp.model.Facturas;
import es.lag.gestionapp.model.LineasPedido;
import es.lag.gestionapp.repository.FacturasRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacturasService {

    @Autowired
    private FacturasRepository repositorio;

    public List<Facturas> findAll() {
        return repositorio.findAll();
    }

    public Facturas save(Facturas facturas) {
        return repositorio.save(facturas);
    }

    public Facturas findById(Long id) {
        return repositorio.findById(id).orElse(null);
    }

    public Facturas delete(@NotNull Facturas facturas) {
        Facturas result = findById(facturas.getId());
        repositorio.delete(result);
        return result;
    }

    //Para Rest
    public Facturas deleteById(Long id) {
        Facturas result = findById(id);
        repositorio.delete(result);
        return result;
    }

    public Facturas findFacturaById(Long id) {
        return repositorio.findById(id).orElse(null);
    }

}
