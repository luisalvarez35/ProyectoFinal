package es.lag.gestionapp.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Proveedores {

    @Id
    @GeneratedValue
    private Long id;

    @NotEmpty
    private Integer codProveedor;

    @NotEmpty
    private String nombre;

    private String direccion;

    private String pais;

    private Integer nifCif;

    private Integer contacto;

    private String email;

    private String comentarios;


    @OneToMany(mappedBy = "proveedores", cascade = {CascadeType.MERGE})
    private List<Productos> productos = new ArrayList<>();

}
