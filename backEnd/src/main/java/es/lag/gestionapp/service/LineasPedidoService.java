package es.lag.gestionapp.service;

import es.lag.gestionapp.model.LineasPedido;
import es.lag.gestionapp.model.PedidosClientes;
import es.lag.gestionapp.repository.LineasPedidoRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LineasPedidoService {

    @Autowired
    private LineasPedidoRepository repositorio;

    public List<LineasPedido> findAll() {
        return repositorio.findAll();
    }

    public LineasPedido save(LineasPedido lineasPedido) {
        return repositorio.save(lineasPedido);
    }

    public LineasPedido findById(Long id) {
        return repositorio.findById(id).orElse(null);
    }

    public List<LineasPedido> findByIdPedido(Long id) {return repositorio.findByIdPedido(id);}


    public LineasPedido delete(@NotNull LineasPedido LineasPedido) {
        LineasPedido result = findById(LineasPedido.getId());
        repositorio.delete(result);
        return result;
    }

    //Para Rest
    public LineasPedido deleteById(Long id) {
        LineasPedido result = findById(id);
        repositorio.delete(result);
        return result;
    }

    public LineasPedido findLineasPedidoById(Long id) {
        return repositorio.findById(id).orElse(null);
    }

}