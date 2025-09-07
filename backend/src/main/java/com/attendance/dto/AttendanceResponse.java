package com.attendance.dto;

public class AttendanceResponse {
    private String message;
    
    public AttendanceResponse() {}
    
    public AttendanceResponse(String message) {
        this.message = message;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
}