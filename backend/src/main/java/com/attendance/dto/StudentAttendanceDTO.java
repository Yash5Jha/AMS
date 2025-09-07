package com.attendance.dto;

import java.time.LocalDate;
import java.util.List;

public class StudentAttendanceDTO {
    private Long id;
    private String rollNumber;
    private String name;
    private Double attendancePercentage;
    private Boolean present; // Used for daily records
    
    public StudentAttendanceDTO() {}
    
    public StudentAttendanceDTO(Long id, String rollNumber, String name, Double attendancePercentage) {
        this.id = id;
        this.rollNumber = rollNumber;
        this.name = name;
        this.attendancePercentage = attendancePercentage;
    }
    
    public StudentAttendanceDTO(Long id, String rollNumber, String name, Boolean present) {
        this.id = id;
        this.rollNumber = rollNumber;
        this.name = name;
        this.present = present;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getRollNumber() {
        return rollNumber;
    }
    
    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public Double getAttendancePercentage() {
        return attendancePercentage;
    }
    
    public void setAttendancePercentage(Double attendancePercentage) {
        this.attendancePercentage = attendancePercentage;
    }
    
    public Boolean getPresent() {
        return present;
    }
    
    public void setPresent(Boolean present) {
        this.present = present;
    }
}