package es.lag.gestionapp.model;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Facturas {

    @Id
    //@GeneratedValue
    private Long id;

    @Temporal(TemporalType.DATE)
    private Date fecha = new Date();

    private String empleado;//por si se borra pedido

    private String cliente;//por si se borra pedido

    private String direccionCliente;

    private String descripcion;

    private Float baseImponible;

    private Integer iva;

    private Float total;

    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "pedidos_clientes_id")
    private PedidosClientes pedidosClientes;

    @OneToMany(mappedBy = "facturas", cascade = {CascadeType.REMOVE, CascadeType.MERGE}, orphanRemoval = true)
    private List<LineasFactura> lineasFacturas = new ArrayList<>();

}

