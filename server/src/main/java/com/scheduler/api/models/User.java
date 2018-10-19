package com.scheduler.api.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class User {
	@Id
	private ObjectId _id;
	private String username;
	private String email;

	private String password;
	
	public User() {
		
	}

	public String get_id() {
		return _id.toHexString();
	}

	public void set_id(ObjectId _id) {
		this._id = _id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
