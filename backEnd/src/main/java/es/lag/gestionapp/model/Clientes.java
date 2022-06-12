package es.lag.gestionapp.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Clientes {

    @Id
    @GeneratedValue
    private Long id;

    @NotEmpty
    private String nombre;

    private String apellidos;

    private String direccion;

    private String poblacion;

    private String pais;

    private Integer codZip;

    private Integer telefono;

    private Integer movil;

    private String email;

    private String comentarios;




    //@JsonIgnore
    @OneToMany(mappedBy = "clientes", cascade = {CascadeType.MERGE,CascadeType.DETACH})
    //@JsonManagedReference(value="clientes")
    private List<PedidosClientes> pedidosClientes = new ArrayList<>();


}
