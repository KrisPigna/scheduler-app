package com.scheduler.api.controllers;

import com.scheduler.api.models.User;
import com.scheduler.api.repositories.UsersRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UsersRepository repository;
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public UserController(UsersRepository applicationUserRepository,
            BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.repository = applicationUserRepository;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}
	
	@RequestMapping(value = "/sign_up", method = RequestMethod.POST)
	public boolean signUp(@Valid @RequestBody User newUser) {
		newUser.set_id(ObjectId.get());
		newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
		repository.save(newUser);
		return true;
	}
}
