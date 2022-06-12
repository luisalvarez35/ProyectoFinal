package es.lag.gestionapp.controller;

import com.fasterxml.jackson.annotation.JsonCreator;
import es.lag.gestionapp.model.Empleados;
import es.lag.gestionapp.service.EmpleadosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class EmpleadosRest {

    @Autowired
    EmpleadosService empleadosService;


    @PostMapping("empleados/rest/new")
    public ResponseEntity createEmpleado(@RequestBody Empleados empleado) {
        Empleados savedEmpleado = empleadosService.save(empleado);
        return ResponseEntity.ok(savedEmpleado);
    }

    @GetMapping("empleados/rest")
    @JsonCreator
    public ResponseEntity<List<Empleados>> listadoEmpleados() {

        List<Empleados> empleados = empleadosService.findAll();

        if (empleados.isEmpty()) {
            return new ResponseEntity<List<Empleados>>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<List<Empleados>>(empleados, HttpStatus.OK);
    }

    @GetMapping("empleados/rest/{id}")
    public ResponseEntity<Empleados> getEmpleado(@PathVariable("id") Long id) {

        Empleados empleado = empleadosService.findEmpleadoById(id);

        return new ResponseEntity<Empleados>(empleado, HttpStatus.OK);

    }

    @PutMapping("empleados/rest/update/{id}")
    public ResponseEntity updateEmpleado(@PathVariable Long id, @RequestBody Empleados empleado) {
        Empleados currentEmpleado = empleadosService.findById(id);

        currentEmpleado = empleado;
        currentEmpleado = empleadosService.save(empleado);

        return ResponseEntity.ok(currentEmpleado);
    }

    @DeleteMapping("empleados/rest/delete/{id}")
    public ResponseEntity<Long> deleteEmpleado(@PathVariable Long id) {

        empleadosService.deleteById(id);

        return new ResponseEntity<>(id, HttpStatus.OK);

    }


}
