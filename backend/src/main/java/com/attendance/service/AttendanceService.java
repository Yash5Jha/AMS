package com.attendance.service;

import com.attendance.dto.AttendanceRequest;
import com.attendance.dto.StudentAttendanceDTO;
import com.attendance.entity.Attendance;
import com.attendance.entity.Student;
import com.attendance.repository.AttendanceRepository;
import com.attendance.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Transactional
    public void markAttendance(AttendanceRequest request) {
        LocalDate date = request.getDate();
        LocalDate today = LocalDate.now();
        if (date.isAfter(today)) {
            throw new IllegalArgumentException("Cannot mark attendance for a future date.");
        }

        for (AttendanceRequest.AttendanceRecord record : request.getRecords()) {
            Optional<Student> studentOpt = studentRepository.findByRollNumber(record.getRollNumber());

            if (studentOpt.isPresent()) {
                Student student = studentOpt.get();

                // Check if attendance already exists for this student and date
                Optional<Attendance> existingAttendance = attendanceRepository.findByStudentAndDate(student, date);

                if (existingAttendance.isPresent()) {
                    // Update existing attendance
                    Attendance attendance = existingAttendance.get();
                    attendance.setStatus(record.getPresent());
                    attendanceRepository.save(attendance);
                } else {
                    // Create new attendance record
                    Attendance attendance = new Attendance(student, date, record.getPresent());
                    attendanceRepository.save(attendance);
                }
            }
        }
    }

    public List<StudentAttendanceDTO> getCumulativeAttendanceRecords() {
        List<Student> students = studentRepository.findAll();

        return students.stream().map(student -> {
            Long totalDays = attendanceRepository.countTotalDaysByStudentId(student.getId());
            Long presentDays = attendanceRepository.countPresentDaysByStudentId(student.getId());

            Double percentage = totalDays > 0 ? (presentDays.doubleValue() / totalDays.doubleValue()) * 100 : 0.0;

            return new StudentAttendanceDTO(
                student.getId(),
                student.getRollNumber(),
                student.getName(),
                Math.round(percentage * 100.0) / 100.0 // Round to 2 decimal places
            );
        }).collect(Collectors.toList());
    }

    public List<StudentAttendanceDTO> getDailyAttendanceRecords(LocalDate date) {
        List<Student> students = studentRepository.findAll();
        List<Attendance> attendanceRecords = attendanceRepository.findByDate(date);

        return students.stream().map(student -> {
            Optional<Attendance> attendance = attendanceRecords.stream()
                .filter(a -> a.getStudent().getId().equals(student.getId()))
                .findFirst();

            Boolean present = attendance.map(Attendance::getStatus).orElse(false);

            return new StudentAttendanceDTO(
                student.getId(),
                student.getRollNumber(),
                student.getName(),
                present
            );
        }).collect(Collectors.toList());
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public List<LocalDate> getAllAttendanceDates() {
        return attendanceRepository.findAllDistinctDates();
    }
}