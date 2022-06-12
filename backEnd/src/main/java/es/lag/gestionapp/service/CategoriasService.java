package es.lag.gestionapp.service;


import es.lag.gestionapp.model.Categorias;
import es.lag.gestionapp.repository.CategoriasRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoriasService {

    @Autowired
    private CategoriasRepository repositorio;

    public List<Categorias> findAll() {
        return repositorio.findAll();
    }

    public Categorias save(Categorias categorias) {
        return repositorio.save(categorias);
    }

    public Categorias findById(Long id) {
        return repositorio.findById(id).orElse(null);
    }

    public Categorias delete(@NotNull Categorias Categorias) {
        Categorias result = findById(Categorias.getId());
        repositorio.delete(result);
        return result;
    }

    //Para Rest
    public Categorias deleteById(Long id) {
        Categorias result = findById(id);
        repositorio.delete(result);
        return result;
    }

    public Categorias findCategoriaById(Long id) {
        return repositorio.findById(id).orElse(null);
    }
    
}