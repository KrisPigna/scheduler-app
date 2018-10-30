package com.scheduler.api.models;

public class AppointmentRequestWrapper {
	private Appointment appointment;
	private String token;
	
	public AppointmentRequestWrapper() {}

	public Appointment getAppointment() {
		return appointment;
	}

	public void setAppointment(Appointment appointment) {
		this.appointment = appointment;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
}
