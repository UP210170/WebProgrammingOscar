package com.example.p02.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import com.example.p02.model.Task;
import com.example.p02.service.TaskService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@Controller
public class TaskController {
  private final TaskService taskService;

  public TaskController(@Autowired TaskService taskService) {
    this.taskService = taskService;
  }

  @GetMapping({ "/all" })
  public ResponseEntity<List<Task>> getTask() {
    return ResponseEntity.ok(taskService.getTask());
  }

  @GetMapping({ "/{id}" })
  public ResponseEntity<Optional<Task>> getTask(@PathVariable Long id) {
    return ResponseEntity.ok(taskService.getTask(id));
  }

  @GetMapping("/listado") // @Controller
  public String listar(Model model) {
    model.addAttribute("titulo", "Listado de Task");
    model.addAttribute("task", taskService.getTask());
    return "lista"; // lista.html
  }
  
  @GetMapping("/eliminar/{id}") // Eliminar Boton
  public String eliminar(@PathVariable Long id, Model model) {
    if (id > 0) {
      taskService.eliminar(id);
    }
    return "redirect:/listado"; // equivalente a @GetMapping ("/listado")
  }

  @GetMapping("/form/{id}") // Editar Cliente boton
  public String actualizar(@PathVariable Long id, Model model) {
    Optional<Task> task = null;
    if (id > 0) {
      task = taskService.getTask(id);
      System.out.println("No. de task: " + task.get().getIdTask());
    } else {
      return "redirect:listado";
    }

    model.addAttribute("titulo", "Editar Task");
    model.addAttribute("task", task);
    return "form";
  }
}

  /* 
  @GetMapping("/form") // "Crear cliente" Boton
  public String crear(Model model) {
    String edoCivil[] = { "Soltero", "Casado", "Divorciado" };
    
    // List<String> edoCivil= new ArrayList<String>();
    // edoCivil.add("Soltero");
    // edoCivil.add("Casado");
    // edoCivil.add("Divorciado");

    model.addAttribute("titulo", "Formulario new cliente");
    model.addAttribute("cliente", new Cliente());
    // model.addAttribute("edoCivil", edoCivil);
    System.out.println("Dentro de forma");
    return "form";
  }

  @PostMapping("/form")   // Enviar
  public String guardar(@Valid Cliente cliente, BindingResult br, Model model) {
    if (br.hasErrors()) {
      model.addAttribute("titulo", "Formulario de cliente");
      return "form";
    } // redirige a la pagina /listar guardando los cambios con 'redirect:'
    clienteService.guardar(cliente);
    return "redirect:listado";
  }
 


  */
