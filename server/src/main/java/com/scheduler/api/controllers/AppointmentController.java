package com.scheduler.api.controllers;

import com.scheduler.api.appointment.Appointment;
import com.scheduler.api.repositories.AppointmentsRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AppointmentController {

	@Autowired
	private AppointmentsRepository repository;
	
	@RequestMapping(value = "/get_appointments", method = RequestMethod.GET)
	public List<Appointment> getAllAppointments() {
		return repository.findAll();
	}
	
	@RequestMapping(value = "/new_appointment", method = RequestMethod.POST)
	public Appointment createAppointment(@Valid @RequestBody Appointment appointment) {
		appointment.set_id(ObjectId.get());
		System.out.println(appointment.get_id());
		repository.save(appointment);
		return appointment;
	}
	
	@RequestMapping(value = "/get_appointment/{id}", method = RequestMethod.GET)
	public Appointment getAppointment(@PathVariable("id") ObjectId id) {
		return repository.findBy_id(id);
	}
	
	@RequestMapping(value = "/change_appointment/{id}", method = RequestMethod.PUT)
	public void modifyAppointmentById(@PathVariable("id") ObjectId id, @Valid @RequestBody Appointment appointment) {
		appointment.set_id(id);
	    repository.save(appointment);
	}
	
	@RequestMapping(value = "/delete_appointment/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") ObjectId id) {
	   repository.delete(repository.findBy_id(id));
	}
}
