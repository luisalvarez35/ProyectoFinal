package es.lag.gestionapp.controller;

import com.fasterxml.jackson.annotation.JsonCreator;
import es.lag.gestionapp.model.LineasPedido;
import es.lag.gestionapp.model.PedidosClientes;
import es.lag.gestionapp.service.EmpleadosService;
import es.lag.gestionapp.service.LineasPedidoService;
import es.lag.gestionapp.service.PedidosClientesService;
import es.lag.gestionapp.service.ProductosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LineasPedidoRest {

    @Autowired
    private LineasPedidoService lineasPedidoService;

    @Autowired
    private PedidosClientesService pedidosClientesService;


    @GetMapping("lineasPedido/rest/detalles/{id}")
    public ResponseEntity<List<LineasPedido>> detallesPedidosClientes(@PathVariable("id") Long id) {


        List<LineasPedido> lineasPedido = lineasPedidoService.findByIdPedido(id);

        if (lineasPedido.isEmpty()) {
            return new ResponseEntity<List<LineasPedido>>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<List<LineasPedido>>(lineasPedido, HttpStatus.OK);

    }


    @PostMapping("lineasPedido/rest/new")
    public ResponseEntity createLineasPedido(@RequestBody LineasPedido lineasPedido) {

        //id del pedido
        PedidosClientes ped = lineasPedido.getPedidosClientes();
        Long id =ped.getId();

        //salvamos linea de pedido
        LineasPedido savedLineasPedido = lineasPedidoService.save(lineasPedido);

        //recuparamos pedido
        PedidosClientes pedido = pedidosClientesService.findById(id);

        //realizamos calculos

        //////////////////////////// Actualizamos baseImponible
        List<LineasPedido> lineasPedidos = lineasPedidoService.findByIdPedido(id);

        float baseTemp= 0f;

        for (int i=0;i<lineasPedidos.size();i++) {

            float precio = lineasPedidos.get(i).getProductos().getPrecioVenta();
            float cantidad = lineasPedidos.get(i).getCantidad();
            float totalLinea = precio * cantidad;

            baseTemp+=totalLinea;
        }
        pedido.setBaseImponible(baseTemp);


        float total = (float)( baseTemp + (baseTemp * (pedido.getIva()*0.01)) );
        pedido.setTotal(total);


        //actualizamos pedido
        pedidosClientesService.save(pedido);
        

        return ResponseEntity.ok(savedLineasPedido);
    }

    @GetMapping("lineasPedido/rest")
    @JsonCreator
    public ResponseEntity<List<LineasPedido>> listadoLineasPedido() {

        List<LineasPedido> lineasPedido = lineasPedidoService.findAll();

        if (lineasPedido.isEmpty()) {
            return new ResponseEntity<List<LineasPedido>>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<List<LineasPedido>>(lineasPedido, HttpStatus.OK);
    }

    @GetMapping("lineasPedido/rest/{id}")
    public ResponseEntity<LineasPedido> getLineasPedido(@PathVariable("id") Long id) {

        LineasPedido lineasPedido = lineasPedidoService.findLineasPedidoById(id);

        return new ResponseEntity<LineasPedido>(lineasPedido, HttpStatus.OK);

    }

    @PutMapping("lineasPedido/rest/update/{id}")
    public ResponseEntity updateLineasPedido(@PathVariable Long id, @RequestBody LineasPedido lineasPedido) {

        //id del pedido
        PedidosClientes ped = lineasPedido.getPedidosClientes();
        Long idPedido =ped.getId();

        //salvamos linea de pedido

        LineasPedido currentLineasPedido = lineasPedidoService.findById(id);

        currentLineasPedido = lineasPedidoService.save(lineasPedido);

        //actualizamos pedido

        //calculamos total de la linea
        //Float total_linea = lineasPedido.getProductos().getPrecioVenta()*lineasPedido.getCantidad();

        //recuparamos pedido
        PedidosClientes pedido = pedidosClientesService.findById(idPedido);

        //realizamos calculos

        /////////////// Actualizamos baseImponible
        List<LineasPedido> lineasPedidos = lineasPedidoService.findByIdPedido(idPedido);

        float baseTemp= 0f;

        for (int i=0;i<lineasPedidos.size();i++) {

            float precio = lineasPedidos.get(i).getProductos().getPrecioVenta();
            float cantidad = lineasPedidos.get(i).getCantidad();
            float totalLinea = precio * cantidad;

            baseTemp+=totalLinea;
        }
        pedido.setBaseImponible(baseTemp);


        float total = (float)( baseTemp + (baseTemp * (pedido.getIva()*0.01)) );
        pedido.setTotal(total);


        //actualizamos pedido
        pedidosClientesService.save(pedido);



        return ResponseEntity.ok(currentLineasPedido);
    }

    @DeleteMapping("lineasPedido/rest/delete/{id}")
    public ResponseEntity<Long> deleteLineasPedido(@PathVariable Long id) {

        lineasPedidoService.deleteById(id);

        return new ResponseEntity<>(id, HttpStatus.OK);

    }


}

