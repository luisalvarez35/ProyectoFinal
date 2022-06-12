package es.lag.gestionapp.service;


import es.lag.gestionapp.model.LineasFactura;
import es.lag.gestionapp.model.LineasPedido;
import es.lag.gestionapp.repository.LineasFacturaRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LineasFacturaService {

    @Autowired
    private LineasFacturaRepository repositorio;

    public List<LineasFactura> findAll() {
        return repositorio.findAll();
    }

    public LineasFactura save(LineasFactura lineasFacturas) {
        return repositorio.save(lineasFacturas);
    }

    public LineasFactura findById(Long id) {
        return repositorio.findById(id).orElse(null);
    }

    public List<LineasFactura> findByIdFactura(Long id) {return repositorio.findByIdFactura(id);}

    public LineasFactura delete(@NotNull LineasFactura LineasFactura) {
        LineasFactura result = findById(LineasFactura.getId());
        repositorio.delete(result);
        return result;
    }



}