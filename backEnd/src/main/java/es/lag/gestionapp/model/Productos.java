package es.lag.gestionapp.model;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;


@Data
@Entity

public class Productos {

    @Id
    @GeneratedValue
    private Long id;

    @NotEmpty
    private String nombre;

    private String descripcion;

    private Float precioCompra;

    private Float precioVenta;

    private Integer stock;

    //No se puedo borrar un proveedor si hay productos en el

    @JsonIgnoreProperties("productos")
    @ManyToOne(optional = false, cascade = {CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "proveedores_id", nullable = false)
    private Proveedores proveedores;

    //No se puede borrar categoria si hay productos en ella

    @JsonIgnoreProperties("productos")
    @ManyToOne(optional = false, cascade = {CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "categorias_id", nullable = false)
    private Categorias categorias;

    //Si se borra un producto se borran las lineas de pedido que contenian ese producto
    @JsonIgnore
    @OneToMany(mappedBy = "productos", cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH}, orphanRemoval = true)
    private List<LineasPedido> lineasPedidos = new ArrayList<>();


}
