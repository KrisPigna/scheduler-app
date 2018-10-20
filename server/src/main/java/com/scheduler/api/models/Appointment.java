package com.scheduler.api.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import java.time.*;
import static java.time.temporal.ChronoUnit.MINUTES;
import java.util.List;

public class Appointment {
	@Id
	private ObjectId _id;
	
	private String title;
	private LocalDate startDate;
	private LocalTime startTime;
	private LocalDate endDate;
	private LocalTime endTime;
	private String notes;
	private int timespan;
	private int startTimeInMinutes;
	private int column;
	
	public List<String> attendees;
	
	public Appointment() {
		
	}

	public String get_id() {
		return _id.toHexString();
	}

	public void set_id(ObjectId _id) {
		this._id = _id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalTime startTime) {
		this.startTime = startTime;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public LocalTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalTime endTime) {
		this.endTime = endTime;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public List<String> getAttendees() {
		return attendees;
	}

	public void setAttendees(List<String> attendees) {
		this.attendees = attendees;
	}
	
	public void setTimespan() {
		this.timespan = (int) this.startTime.until(this.endTime, MINUTES);
	}
	
	public int getTimespan() {
		return this.timespan;
	}
	
	public void setStartTimeInMinutes() {
		LocalTime midnight = LocalTime.of(0, 0);
		this.startTimeInMinutes = (int) midnight.until(this.startTime, MINUTES);
	}
	
	public int getStartTimeInMinutes() {
		return this.startTimeInMinutes;
	}
	
	public void setColumn() {
		this.column = 0;
	}
	
	public int getColumn() {
		return this.column;
	}
}