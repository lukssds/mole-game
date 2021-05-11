package com.lucassamuel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucassamuel.entities.Usuario;
import com.lucassamuel.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
	
	@Autowired
	UsuarioRepository repository;
	
	@CrossOrigin
	@GetMapping
	public List<Usuario> todos(){
		return repository.findAll();
		
	}
	
	@CrossOrigin
	@PostMapping
	public Usuario novo(@RequestBody Usuario usuario) {
		return repository.save(usuario);
	}
}
