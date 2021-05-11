package com.lucassamuel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucassamuel.entities.Ranking;
import com.lucassamuel.repository.RankingRepository;


@RestController
@RequestMapping("/ranking")
public class RankingController {
	@Autowired
	RankingRepository repository;

	
	@PostMapping
	@CrossOrigin
	Ranking gravaPontuacao(@RequestBody Ranking ranking) { 
		return repository.save(ranking);
	}
	
	
	@GetMapping()	
	public List<Ranking> FindAll(){
		return repository.findAll();
		
	}
	
}
