package es.lag.gestionapp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;


@Entity
@Data
public class Empleados {

    @Id
    @GeneratedValue
    private Long id;

    @NotEmpty
    private String nombre;

    @NotEmpty
    private String apellidos;

    private String direccion;

    private String poblacion;

    private Integer codZip;

    private Integer telefono;

    private Integer movil;

    private String email;

    private String comentarios;

    //@JsonIgnore
    //@JsonIgnoreProperties("empleados")
    @OneToMany(mappedBy = "empleados", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    //@JsonManagedReference(value="empleados")
    private List<PedidosClientes> pedidosClientes = new ArrayList<>();


}
