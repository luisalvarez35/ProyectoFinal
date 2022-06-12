package es.lag.gestionapp.controller;

import com.fasterxml.jackson.annotation.JsonCreator;
import es.lag.gestionapp.model.Productos;
import es.lag.gestionapp.service.ProductosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProductosRest {

    @Autowired
    ProductosService productosService;


    @PostMapping("productos/rest/new")
    public ResponseEntity createProducto(@RequestBody Productos producto) {
        Productos savedProducto = productosService.save(producto);
        return ResponseEntity.ok(savedProducto);
    }

    @GetMapping("productos/rest")
    @JsonCreator
    public ResponseEntity<List<Productos>> listadoProductos() {

        List<Productos> productos = productosService.findAll();

        if (productos.isEmpty()) {
            return new ResponseEntity<List<Productos>>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<List<Productos>>(productos, HttpStatus.OK);
    }

    @GetMapping("productos/rest/{id}")
    public ResponseEntity<Productos> getProducto(@PathVariable("id") Long id) {

        Productos producto = productosService.findProductoById(id);

        return new ResponseEntity<Productos>(producto, HttpStatus.OK);

    }

    @PutMapping("productos/rest/update/{id}")
    public ResponseEntity updateProducto(@PathVariable Long id, @RequestBody Productos producto) {
        Productos currentProducto = productosService.findById(id);

        currentProducto = productosService.save(producto);

        return ResponseEntity.ok(currentProducto);
    }

    @DeleteMapping("productos/rest/delete/{id}")
    public ResponseEntity<Long> deleteProducto(@PathVariable Long id) {

        productosService.deleteById(id);

        return new ResponseEntity<>(id, HttpStatus.OK);

    }


}

