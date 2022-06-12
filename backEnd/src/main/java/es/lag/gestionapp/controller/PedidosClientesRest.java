package es.lag.gestionapp.controller;

import com.fasterxml.jackson.annotation.JsonCreator;
import es.lag.gestionapp.model.PedidosClientes;
import es.lag.gestionapp.service.PedidosClientesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PedidosClientesRest {

    @Autowired
    PedidosClientesService pedidosClientesService;


    @PostMapping("pedidosClientes/rest/new")
    public ResponseEntity createPedidosCliente(@RequestBody PedidosClientes pedidosCliente) {

        PedidosClientes savedPedidosCliente = pedidosClientesService.save(pedidosCliente);
        return ResponseEntity.ok(savedPedidosCliente);
    }

    @GetMapping("pedidosClientes/rest")
    @JsonCreator
    public ResponseEntity<List<PedidosClientes>> listadoPedidosClientes() {

        List<PedidosClientes> pedidosClientes = pedidosClientesService.findAll();

        if (pedidosClientes.isEmpty()) {
            return new ResponseEntity<List<PedidosClientes>>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<List<PedidosClientes>>(pedidosClientes, HttpStatus.OK);
    }

    @GetMapping("pedidosClientes/rest/{id}")
    public ResponseEntity<PedidosClientes> getPedidosCliente(@PathVariable("id") Long id) {

        PedidosClientes pedidosCliente = pedidosClientesService.findPedidosClientesById(id);

        return new ResponseEntity<PedidosClientes>(pedidosCliente, HttpStatus.OK);

    }

    @PutMapping("pedidosClientes/rest/update/{id}")
    public ResponseEntity updatePedidosCliente(@PathVariable Long id, @RequestBody PedidosClientes pedidosCliente) {
        //Pedido antiguo
        PedidosClientes currentPedidosCliente = pedidosClientesService.findById(id);

        currentPedidosCliente.setClientes(pedidosCliente.getClientes());
        currentPedidosCliente.setEmpleados(pedidosCliente.getEmpleados());
        currentPedidosCliente.setDescripcion(pedidosCliente.getDescripcion());
        currentPedidosCliente.setIva(pedidosCliente.getIva());

        float total = (float)( currentPedidosCliente.getBaseImponible() + (currentPedidosCliente.getBaseImponible() * (currentPedidosCliente.getIva()*0.01)) );
        currentPedidosCliente.setTotal(total);

        pedidosClientesService.save(currentPedidosCliente);


        return ResponseEntity.ok(currentPedidosCliente);
    }

    @DeleteMapping("pedidosClientes/rest/delete/{id}")
    public ResponseEntity<Long> deletePedidosCliente(@PathVariable Long id) {

        pedidosClientesService.deleteById(id);

        return new ResponseEntity<>(id, HttpStatus.OK);

    }


}

