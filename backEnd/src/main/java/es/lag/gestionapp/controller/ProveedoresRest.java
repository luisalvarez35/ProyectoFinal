package es.lag.gestionapp.controller;

import com.fasterxml.jackson.annotation.JsonCreator;
import es.lag.gestionapp.model.Proveedores;
import es.lag.gestionapp.service.ProveedoresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProveedoresRest {

    @Autowired
    ProveedoresService proveedoresService;


    @PostMapping("proveedores/rest/new")
    public ResponseEntity createProveedor(@RequestBody Proveedores proveedor) {
        Proveedores savedProveedor = proveedoresService.save(proveedor);
        return ResponseEntity.ok(savedProveedor);
    }

    @GetMapping("proveedores/rest")
    @JsonCreator
    public ResponseEntity<List<Proveedores>> listadoProveedores() {

        List<Proveedores> proveedores = proveedoresService.findAll();

        if (proveedores.isEmpty()) {
            return new ResponseEntity<List<Proveedores>>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<List<Proveedores>>(proveedores, HttpStatus.OK);
    }

    @GetMapping("proveedores/rest/{id}")
    public ResponseEntity<Proveedores> getProveedor(@PathVariable("id") Long id) {

        Proveedores proveedor = proveedoresService.findProveedorById(id);

        return new ResponseEntity<Proveedores>(proveedor, HttpStatus.OK);

    }

    @PutMapping("proveedores/rest/update/{id}")
    public ResponseEntity updateProveedor(@PathVariable Long id, @RequestBody Proveedores proveedor) {
        Proveedores currentProveedor = proveedoresService.findById(id);

        currentProveedor = proveedor;
        currentProveedor = proveedoresService.save(proveedor);

        return ResponseEntity.ok(currentProveedor);
    }

    @DeleteMapping("proveedores/rest/delete/{id}")
    public ResponseEntity<Long> deleteProveedor(@PathVariable Long id) {

        proveedoresService.deleteById(id);

        return new ResponseEntity<>(id, HttpStatus.OK);

    }


}

