package com.scheduler.api.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.scheduler.api.models.User;

public interface UsersRepository extends MongoRepository<User, String> {
	User findBy_id(ObjectId id);

	User findByUsername(String username);
}
