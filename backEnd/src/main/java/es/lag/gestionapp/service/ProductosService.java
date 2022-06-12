package es.lag.gestionapp.service;

import es.lag.gestionapp.model.Productos;
import es.lag.gestionapp.model.Productos;
import es.lag.gestionapp.repository.ProductosRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductosService {

    @Autowired
    private ProductosRepository repositorio;

    public List<Productos> findAll() {
        return repositorio.findAll();
    }

    public Productos save(Productos productos) {
        return repositorio.save(productos);
    }

    public Productos findById(Long id) {
        return repositorio.findById(id).orElse(null);
    }

    public Productos delete(@NotNull Productos Productos) {
        Productos result = findById(Productos.getId());
        repositorio.delete(result);
        return result;
    }

    public Optional<Productos> findOptionalById(Long id) {
        return repositorio.findById(id);
    }

    //Para Rest
    public Productos deleteById(Long id) {
        Productos result = findById(id);
        repositorio.delete(result);
        return result;
    }

    public Productos findProductoById(Long id) {
        return repositorio.findById(id).orElse(null);
    }
}