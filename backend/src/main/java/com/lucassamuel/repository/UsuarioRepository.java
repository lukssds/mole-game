package com.lucassamuel.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lucassamuel.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

}
