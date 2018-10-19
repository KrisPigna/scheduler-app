package com.scheduler.api.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.scheduler.api.models.Appointment;

public interface AppointmentsRepository extends MongoRepository<Appointment, String> {
	Appointment findBy_id(ObjectId id);
}
