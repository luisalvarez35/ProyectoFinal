package es.lag.gestionapp.controller;



import com.fasterxml.jackson.databind.ObjectMapper;
import es.lag.gestionapp.GestionAppApplication;
import es.lag.gestionapp.model.Categorias;
import es.lag.gestionapp.service.CategoriasService;
import org.junit.jupiter.api.Test;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static net.bytebuddy.matcher.ElementMatchers.is;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionAppApplication.class)
@AutoConfigureMockMvc
class CategoriasRestTest{

    @Autowired
    CategoriasService categoriasService;

    @Autowired
    private MockMvc mvc;

    @Test
    public void createCategoria() throws Exception {

        Categorias cat = new Categorias();
        //cat.setId(1000L);
        cat.setNombre("Test");

        ObjectMapper mapper = new ObjectMapper();

        String jsonInString = mapper.writeValueAsString(cat);



        mvc.perform(post("/categorias/rest/new")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonInString))

                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON));

    }

    @Test
    public void listadoCategorias() throws Exception {

        mvc.perform(get("/categorias/rest")
                        .contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk())
                        .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON));

    }

    @Test
    public void getCategoria() throws Exception {

        mvc.perform(get("/categorias/rest/172")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON));

    }



    @Test
    public void updateCategoria() throws Exception {

        Categorias cat = new Categorias();
        //cat.setId(1000L);
        cat.setNombre("Test2");

        ObjectMapper mapper = new ObjectMapper();

        String jsonInString = mapper.writeValueAsString(cat);



        mvc.perform(put("/categorias/rest/update/172")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonInString))

                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON));

    }

    @Test
    public void deleteCategoria() throws Exception {

        mvc.perform(delete("/categorias/rest/delete/172")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON));

    }

}