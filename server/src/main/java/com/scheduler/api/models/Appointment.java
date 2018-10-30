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
	
	public ObjectId getObjectId() {
		return _id;
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

	public String getStartTime() {
		int hour = startTime.getHour();
		int minutes = startTime.getMinute();
		String minutesString;
		String suffix = "am";
		if (hour >=13) {
			hour -= 12;
			suffix = "pm";
		}
		if (hour == 12) {
			suffix = "pm";
		}
		if (minutes == 0) {
			minutesString = "00";
		}
		else {
			minutesString = Integer.toString(minutes);
		}
		String time = Integer.toString(hour) + ":" + minutesString + suffix;
		return time;
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

	public String getEndTime() {
		int hour = endTime.getHour();
		int minutes = endTime.getMinute();
		String minutesString;
		String suffix = "am";
		if (hour >=13) {
			hour -= 12;
			suffix = "pm";
		}
		if (hour == 12) {
			suffix = "pm";
		}
		if (minutes == 0) {
			minutesString = "00";
		}
		else {
			minutesString = Integer.toString(minutes);
		}
		String time = Integer.toString(hour) + ":" + minutesString + suffix;
		return time;
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
