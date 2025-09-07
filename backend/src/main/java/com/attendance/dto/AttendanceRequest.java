package com.attendance.dto;

import java.time.LocalDate;
import java.util.List;

// Request DTO for marking attendance
public class AttendanceRequest {
    private LocalDate date;
    private List<AttendanceRecord> records;
    
    public AttendanceRequest() {}
    
    public AttendanceRequest(LocalDate date, List<AttendanceRecord> records) {
        this.date = date;
        this.records = records;
    }
    
    public LocalDate getDate() {
        return date;
    }
    
    public void setDate(LocalDate date) {
        this.date = date;
    }
    
    public List<AttendanceRecord> getRecords() {
        return records;
    }
    
    public void setRecords(List<AttendanceRecord> records) {
        this.records = records;
    }
    
    // Nested class for individual attendance records
    public static class AttendanceRecord {
        private String rollNumber;
        private Boolean present;
        
        public AttendanceRecord() {}
        
        public AttendanceRecord(String rollNumber, Boolean present) {
            this.rollNumber = rollNumber;
            this.present = present;
        }
        
        public String getRollNumber() {
            return rollNumber;
        }
        
        public void setRollNumber(String rollNumber) {
            this.rollNumber = rollNumber;
        }
        
        public Boolean getPresent() {
            return present;
        }
        
        public void setPresent(Boolean present) {
            this.present = present;
        }
    }
}