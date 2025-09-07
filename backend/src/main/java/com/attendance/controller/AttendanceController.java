package com.attendance.controller;

import com.attendance.dto.AttendanceRequest;
import com.attendance.dto.AttendanceResponse;
import com.attendance.dto.StudentAttendanceDTO;
import com.attendance.entity.Student;
import com.attendance.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")

public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/mark")
    public ResponseEntity<AttendanceResponse> markAttendance(@RequestBody AttendanceRequest request) {
        try {
            attendanceService.markAttendance(request);
            return ResponseEntity.ok(new AttendanceResponse(
                "Attendance marked successfully for " + request.getDate()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AttendanceResponse(
                "Error marking attendance: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/records")
    public ResponseEntity<List<StudentAttendanceDTO>> getAttendanceRecords() {
        try {
            List<StudentAttendanceDTO> records = attendanceService.getCumulativeAttendanceRecords();
            return ResponseEntity.ok(records);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/records/{date}")
    public ResponseEntity<List<StudentAttendanceDTO>> getDailyAttendanceRecords(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        try {
            List<StudentAttendanceDTO> records = attendanceService.getDailyAttendanceRecords(date);
            return ResponseEntity.ok(records);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/students")
    public ResponseEntity<List<Student>> getAllStudents() {
        try {
            List<Student> students = attendanceService.getAllStudents();
            return ResponseEntity.ok(students);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/dates")
    public ResponseEntity<List<LocalDate>> getAllAttendanceDates() {
        try {
            List<LocalDate> dates = attendanceService.getAllAttendanceDates();
            return ResponseEntity.ok(dates);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}