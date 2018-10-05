package com.scheduler.api.appointment;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import java.time.*;
import java.util.List;

public class Appointment {
	@Id
	public ObjectId _id;
	
	public LocalDateTime start;
	public LocalDateTime end;
	
	public List<String> attendees;
	
	public Appointment() {
		
	}

	public String get_id() {
		return _id.toHexString();
	}

	public void set_id(ObjectId _id) {
		this._id = _id;
	}

	public LocalDateTime getStart() {
		return start;
	}

	public void setStart(LocalDateTime start) {
		this.start = start;
	}

	public LocalDateTime getEnd() {
		return end;
	}

	public void setEnd(LocalDateTime end) {
		this.end = end;
	}

	public List<String> getAttendees() {
		return attendees;
	}

	public void setAttendees(List<String> attendees) {
		this.attendees = attendees;
	}
}
