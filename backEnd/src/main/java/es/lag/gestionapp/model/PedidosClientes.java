package es.lag.gestionapp.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
/*import javax.validation.constraints.NotNull;
import java.sql.Date;*/
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class PedidosClientes {

    @Id
    @GeneratedValue
    private Long id;

    @Temporal(TemporalType.DATE)
    private Date fecha = new Date();

    private String descripcion;

    private Float baseImponible = 0f;

    private Integer iva = 0;

    private Float total = 0f;


    @ManyToOne(optional = false)
    @JoinColumn(name = "empleados_id", nullable = false)
    //@JsonBackReference(value="empleados")
    @JsonIgnoreProperties(value = "pedidosClientes")
    private Empleados empleados;


    @ManyToOne(optional = false)
    @JoinColumn(name = "clientes_id", nullable = false)
    //@JsonBackReference(value="clientes")
    @JsonIgnoreProperties(value = "pedidosClientes")
    private Clientes clientes;


    @OneToMany(mappedBy = "pedidosClientes", cascade = {CascadeType.REMOVE, CascadeType.MERGE,CascadeType.REFRESH}, orphanRemoval = true)
    @JsonManagedReference
    private List<LineasPedido> lineasPedidos = new ArrayList<>();
}
