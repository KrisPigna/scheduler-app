package com.scheduler.api.controllers;

import com.scheduler.api.models.Appointment;
import com.scheduler.api.models.AppointmentRequestWrapper;
import com.scheduler.api.models.User;
import com.scheduler.api.repositories.AppointmentsRepository;
import com.scheduler.api.repositories.UsersRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;
import java.util.List;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;

@RestController
@RequestMapping("/api")
public class AppointmentController {

	@Autowired
	private AppointmentsRepository apptRepository;
	@Autowired
	private UsersRepository userRepository;
	
	@RequestMapping(value = "/get_appointments", method = RequestMethod.POST)
	public List<Appointment> getAllAppointments(@Valid @RequestBody AppointmentRequestWrapper req) {
		DecodedJWT token = JWT.decode(req.getToken());
		User user = userRepository.findByUsername(token.getSubject());
		return user.getAppointmentList();
	}
	
	@RequestMapping(value = "/new_appointment", method = RequestMethod.POST)
	public Appointment createAppointment(@Valid @RequestBody AppointmentRequestWrapper req) {
		Appointment appointment = req.getAppointment();
		DecodedJWT token = JWT.decode(req.getToken());
		User user = userRepository.findByUsername(token.getSubject());
		List<Appointment> apptList = user.getAppointmentList();
		appointment.set_id(ObjectId.get());
		appointment.setTimespan();
		appointment.setStartTimeInMinutes();
		appointment.setColumn();
		apptList.add(appointment);
		user.setAppointmentList(apptList);
		userRepository.save(user);
		return appointment;
	}
	
	@RequestMapping(value = "/change_appointment/{id}", method = RequestMethod.PUT)
	public Appointment modifyAppointmentById(@PathVariable("id") ObjectId id, @Valid @RequestBody Appointment appointment) {
		appointment.set_id(id);
	    return apptRepository.save(appointment);
	}
	
	@RequestMapping(value = "/delete_appointment", method = RequestMethod.POST)
	public List<Appointment> delete(@Valid @RequestBody AppointmentRequestWrapper req) {
		Appointment appointment = req.getAppointment();
		DecodedJWT token = JWT.decode(req.getToken());
		User user = userRepository.findByUsername(token.getSubject());
		List<Appointment> apptList = user.getAppointmentList();
		System.out.println(appointment.get_id());
		for (int i = 0; i < apptList.size(); i++) {
			System.out.println(apptList.get(i).get_id());
			if(apptList.get(i).get_id().equals(appointment.get_id())) {
				System.out.println(apptList.get(i).get_id());
				System.out.println(appointment.get_id());
				apptList.remove(i);
			}
		}
		user.setAppointmentList(apptList);
		userRepository.save(user);
		return apptList;
	}
}
