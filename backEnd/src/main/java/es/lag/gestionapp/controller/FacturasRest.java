package es.lag.gestionapp.controller;

import com.fasterxml.jackson.annotation.JsonCreator;
import es.lag.gestionapp.model.Facturas;
import es.lag.gestionapp.model.LineasFactura;
import es.lag.gestionapp.model.LineasPedido;
import es.lag.gestionapp.model.PedidosClientes;
import es.lag.gestionapp.service.*;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class FacturasRest {

    @Autowired
    private FacturasService facturasService;

    @Autowired
    private LineasFacturaService lineasFacturaService;

    @Autowired
    private PedidosClientesService pedidosClientesService;

    @Autowired
    private LineasPedidoService lineasPedidoService;


    @GetMapping("facturas/rest")
    @JsonCreator
    public ResponseEntity<List<Facturas>> listadoFacturas() {

        List<Facturas> facturas = facturasService.findAll();

        if (facturas.isEmpty()) {
            return new ResponseEntity<List<Facturas>>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<List<Facturas>>(facturas, HttpStatus.OK);
    }

    //Para crear nueva factura pasandole el id del pedido
    @PostMapping("facturas/rest/new/{id}")
    public ResponseEntity createFactura(@PathVariable Long id) {

        PedidosClientes pedido = pedidosClientesService.findById(id);    //tenemos el pedido
        List<LineasPedido> lineasPedido = lineasPedidoService.findByIdPedido(id); //tenemos array con lineas de pedido

        Facturas factura = new Facturas();

        //Copiamos datos a objeto factura de pedido

        factura.setId(id);
        factura.setFecha(pedido.getFecha());
        factura.setEmpleado(pedido.getEmpleados().getNombre());
        factura.setCliente(pedido.getClientes().getNombre());
        factura.setDireccionCliente(pedido.getClientes().getDireccion());
        factura.setDescripcion(pedido.getDescripcion());
        factura.setBaseImponible(pedido.getBaseImponible());
        factura.setIva(pedido.getIva());
        factura.setTotal(pedido.getTotal());


        //Salvamos factura
        facturasService.save(factura);

        //recorremos array y salvamos cada entrada

        for (int i=0;i<lineasPedido.size();i++) {

            LineasPedido lineaPedido = lineasPedido.get(i);

            LineasFactura lineaFactura = new LineasFactura();

            lineaFactura.setId(lineaPedido.getId());
            lineaFactura.setProducto(lineaPedido.getProductos().getNombre());
            lineaFactura.setCantidad(lineaPedido.getCantidad());
            lineaFactura.setDescripcion(lineaPedido.getDescripcion());
            lineaFactura.setPrecio(lineaPedido.getProductos().getPrecioVenta());
            lineaFactura.setFacturas(factura);

            lineasFacturaService.save(lineaFactura);
        }

        return ResponseEntity.ok(factura);
    }

    @DeleteMapping("facturas/rest/delete/{id}")
    public ResponseEntity<Long> deleteFactura(@PathVariable Long id) {

        facturasService.deleteById(id);

        return new ResponseEntity<>(id, HttpStatus.OK);

    }

    //Obtener factura por el id
    @GetMapping("facturas/rest/{id}")
    public ResponseEntity<Facturas> getFactura(@PathVariable("id") Long id) {

        Facturas factura = facturasService.findById(id);

        return new ResponseEntity<Facturas>(factura, HttpStatus.OK);

    }

    //Obtener lineas de una factura por el id de la factura
    @GetMapping("lineasFacturas/rest/{id}")
    public ResponseEntity<List<LineasFactura>> getLineasFactura(@PathVariable("id") Long id) {

        List<LineasFactura> lineasFactura = lineasFacturaService.findByIdFactura(id);

        return new ResponseEntity<List<LineasFactura>>(lineasFactura, HttpStatus.OK);

    }


}

