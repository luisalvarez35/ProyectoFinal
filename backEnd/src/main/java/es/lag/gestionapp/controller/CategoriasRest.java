package es.lag.gestionapp.controller;

import com.fasterxml.jackson.annotation.JsonCreator;
import es.lag.gestionapp.model.Categorias;
import es.lag.gestionapp.service.CategoriasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CategoriasRest {

    @Autowired
    CategoriasService categoriasService;


    @PostMapping("categorias/rest/new")
    public ResponseEntity createCategoria(@RequestBody Categorias categoria) {
        Categorias savedCategoria = categoriasService.save(categoria);
        return new ResponseEntity<Categorias>(savedCategoria, HttpStatus.OK);
    }

    @GetMapping("categorias/rest")
    @JsonCreator
    public ResponseEntity<List<Categorias>> listadoCategorias() {

        List<Categorias> categorias = categoriasService.findAll();

        if (categorias.isEmpty()) {
            return new ResponseEntity<List<Categorias>>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<List<Categorias>>(categorias, HttpStatus.OK);
    }

    @GetMapping("categorias/rest/{id}")
    public ResponseEntity<Categorias> getCategoria(@PathVariable("id") Long id) {

        Categorias categoria = categoriasService.findCategoriaById(id);

        return new ResponseEntity<Categorias>(categoria, HttpStatus.OK);

    }

    @PutMapping("categorias/rest/update/{id}")
    public ResponseEntity updateCategoria(@PathVariable Long id, @RequestBody Categorias categoria) {
        Categorias currentCategoria = categoriasService.findById(id);

        currentCategoria = categoria;
        currentCategoria = categoriasService.save(categoria);

        return ResponseEntity.ok(currentCategoria);
    }

    @DeleteMapping("categorias/rest/delete/{id}")
    public ResponseEntity<Long> deleteCategoria(@PathVariable Long id) {

        categoriasService.deleteById(id);

        return new ResponseEntity<>(id, HttpStatus.OK);

    }


}

