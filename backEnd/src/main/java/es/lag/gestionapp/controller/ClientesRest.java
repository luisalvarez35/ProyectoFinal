package es.lag.gestionapp.controller;

import com.fasterxml.jackson.annotation.JsonCreator;
import es.lag.gestionapp.model.Clientes;
import es.lag.gestionapp.service.ClientesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ClientesRest {

    @Autowired
    ClientesService clientesService;


    @PostMapping("clientes/rest/new")
    public ResponseEntity createCliente(@RequestBody Clientes cliente) {
        Clientes savedCliente = clientesService.save(cliente);
        return ResponseEntity.ok(savedCliente);
    }

    @GetMapping("clientes/rest")
    @JsonCreator
    public ResponseEntity<List<Clientes>> listadoClientes() {

        List<Clientes> clientes = clientesService.findAll();

        if (clientes.isEmpty()) {
            return new ResponseEntity<List<Clientes>>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<List<Clientes>>(clientes, HttpStatus.OK);
    }

    @GetMapping("clientes/rest/{id}")
    public ResponseEntity<Clientes> getCliente(@PathVariable("id") Long id) {

        Clientes cliente = clientesService.findClienteById(id);

        return new ResponseEntity<Clientes>(cliente, HttpStatus.OK);

    }

    @PutMapping("clientes/rest/update/{id}")
    public ResponseEntity updateCliente(@PathVariable Long id, @RequestBody Clientes cliente) {
        Clientes currentCliente = clientesService.findById(id);

        currentCliente = cliente;
        currentCliente = clientesService.save(cliente);

        return ResponseEntity.ok(currentCliente);
    }

    @DeleteMapping("clientes/rest/delete/{id}")
    public ResponseEntity<Long> deleteCliente(@PathVariable Long id) {

        clientesService.deleteById(id);

        return new ResponseEntity<>(id, HttpStatus.OK);

    }


}

