package es.lag.gestionapp.service;

import es.lag.gestionapp.model.PedidosClientes;

import es.lag.gestionapp.repository.PedidosClientesRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidosClientesService {
    
    @Autowired
    private PedidosClientesRepository repositorio;

    public List<PedidosClientes> findAll() {
        return repositorio.findAll();
    }

    public PedidosClientes save(PedidosClientes PedidosPedidosClientes) {
        return repositorio.save(PedidosPedidosClientes);
    }

    public PedidosClientes findById(Long id) {
        return repositorio.findById(id).orElse(null);
    }

    public PedidosClientes delete(@NotNull PedidosClientes PedidosClientes) {
        PedidosClientes result = findById(PedidosClientes.getId());
        repositorio.delete(result);
        return result;
    }

    //Para Rest
    public PedidosClientes deleteById(Long id) {
        PedidosClientes result = findById(id);
        repositorio.delete(result);
        return result;
    }

    public PedidosClientes findPedidosClientesById(Long id) {
        return repositorio.findById(id).orElse(null);
    }
}
