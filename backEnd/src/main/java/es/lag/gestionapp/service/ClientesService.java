package es.lag.gestionapp.service;

import es.lag.gestionapp.model.Empleados;
import es.lag.gestionapp.repository.ClientesRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import es.lag.gestionapp.model.Clientes;

import java.util.List;

@Service
public class ClientesService {

    @Autowired
    private ClientesRepository repositorio;

    public List<Clientes> findAll() {
        return repositorio.findAll();
    }

    public Clientes save(Clientes clientes) {
        return repositorio.save(clientes);
    }

    public Clientes findById(Long id) {
        return repositorio.findById(id).orElse(null);
    }

    public Clientes delete(@NotNull Clientes Clientes) {
       Clientes result = findById(Clientes.getId());
        repositorio.delete(result);
        return result;
    }

    //Para Rest
    public Clientes deleteById(Long id) {
        Clientes result = findById(id);
        repositorio.delete(result);
        return result;
    }

    public Clientes findClienteById(Long id) {
        return repositorio.findById(id).orElse(null);
    }
}