package es.lag.gestionapp.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Categorias {

    @Id
    @GeneratedValue
    private Long id;

    @NotEmpty
    private String nombre;

    private String descripcion;


    @OneToMany(mappedBy = "categorias", cascade = {CascadeType.MERGE})
    private List<Productos> productos = new ArrayList<>();

}
