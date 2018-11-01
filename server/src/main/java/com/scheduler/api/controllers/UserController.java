package com.scheduler.api.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.scheduler.api.models.Appointment;
import com.scheduler.api.models.User;
import com.scheduler.api.models.UserRequestWrapper;
import com.scheduler.api.repositories.UsersRepository;
import com.scheduler.api.security.SecurityConstants;
import com.scheduler.api.security.UserDetailsServiceImpl;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UsersRepository repository;
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public UserController(UsersRepository applicationUserRepository,
            BCryptPasswordEncoder bCryptPasswordEncoder, UserDetailsServiceImpl service) {
		this.repository = applicationUserRepository;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}
	
	@RequestMapping(value = "/sign_up", method = RequestMethod.POST)
	public String signUp(@Valid @RequestBody User newUser) {
		newUser.set_id(ObjectId.get());
		newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
		List<Appointment> list = new ArrayList<>();
		newUser.setAppointmentList(list);
		newUser.setRememberToken("");
		try { 
			repository.save(newUser);
			return "{\"created\": true, \"duplicate\": \"none\"}";
		}
		catch(DuplicateKeyException e) {
			String message = e.getMessage();
			int i = message.indexOf("$");
			String cause = message.substring(i + 1, i + 2);
			if (cause.equals("u")) {
				return "{\"created\": false, \"duplicate\": \"username\"}";
			}
			else if (cause.equals("e")) {
				return "{\"created\": false, \"duplicate\": \"email\"}";
			}
			else {
				return "{\"created\": false, \"duplicate\": \"error\"}";
			}
		}
	}
	
	@RequestMapping(value = "/sign_in", method = RequestMethod.POST)
	public String signIn(@Valid @RequestBody UserRequestWrapper req) {
		String token;
		if (req.getCookie() == null) {
			User user = repository.findByUsername(req.getUsername());
			if (user == null) {
				return "{\"failed\": true}";
			}
			else if (bCryptPasswordEncoder.matches(req.getPassword(), user.getPassword()) == false) {
				return "{\"failed\": true}";
			}
			else {
				if (req.getRemember().equals("true")) {
					SecureRandom prng;
					try {
						prng = SecureRandom.getInstance("SHA1PRNG");
			    	    String randomNum = Long.valueOf(prng.nextLong()).toString();
			    	    user.setRememberToken(randomNum);
			    	    repository.save(user);
			    	    String cookie = user.get_id() + ":" + randomNum;
			    	    String hashedCookie =  bCryptPasswordEncoder.encode(cookie);
			    	    cookie += ":" + hashedCookie;
						token = JWT.create()
				                .withSubject(req.getUsername())
				                .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
				                .sign(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()));
				      
				        return "{\"token\": \"" + token.toString() + "\", \"username\": \"" + user.getUsername() + "\", \"cookie\":\"" + cookie + "\", \"failed\": false}";
					} catch (NoSuchAlgorithmException e) {
						return null;
					}
				}
				else {
					user.setRememberToken("");
					repository.save(user);
					token = JWT.create()
			                .withSubject(req.getUsername())
			                .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
			                .sign(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()));
			      
			        return "{\"token\": \"" + token.toString() + "\", \"username\":\"" + req.getUsername() + "\", \"failed\": false}";
				}
			}
		}
		else {
			String cookie = req.getCookie();
			cookie = cookie.substring(11);
			String[] cookieArray = cookie.split("\\:");
			if (bCryptPasswordEncoder.matches(cookieArray[0] + ":" + cookieArray[1], cookieArray[2]) == false) {
				return "{\"cookie\": false}";
			}
			else {
				ObjectId id = new ObjectId(cookieArray[0]);
				User user = repository.findBy_id(id);
				if (user.getRememberToken().equals(cookieArray[1])) {
					SecureRandom prng;
					try {
						prng = SecureRandom.getInstance("SHA1PRNG");
			    	    String randomNum = Long.valueOf(prng.nextLong()).toString();
			    	    user.setRememberToken(randomNum);
			    	    repository.save(user);
			    	    cookie = user.get_id() + ":" + randomNum;
			    	    String hashedCookie =  bCryptPasswordEncoder.encode(cookie);
			    	    cookie += ":" + hashedCookie;
						token = JWT.create()
				                .withSubject(user.getUsername())
				                .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
				                .sign(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()));
				      
				        return "{\"token\": \"" + token.toString() + "\", \"username\": \"" + user.getUsername() + "\", \"cookie\":\"" + cookie + "\", \"failed\": false}";
					} catch (NoSuchAlgorithmException e) {
						return null;
					}
				}
				else {
					return "{\"cookie\": false}";
				}
			}
		}
	}
}
