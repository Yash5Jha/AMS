package com.attendance.config;

import com.attendance.entity.Attendance;
import com.attendance.entity.Student;
import com.attendance.repository.AttendanceRepository;
import com.attendance.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Override
    public void run(String... args) throws Exception {
        // Load sample students if database is empty
        if (studentRepository.count() == 0) {
            loadSampleStudents();
            loadSampleAttendanceData();
        }
    }

    private void loadSampleStudents() {
        String[] names = {
            "John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "David Brown",
            "Emily Davis", "Alex Miller", "Lisa Garcia", "Tom Anderson", "Anna Martinez",
            "Chris Taylor", "Rachel Green", "Kevin Lee", "Sophie Chen", "Daniel White",
            "Maya Patel", "Ryan Murphy", "Olivia Jones", "Ethan Clark", "Grace Kim",
            "Lucas Rodriguez", "Zoe Thompson", "Noah Williams", "Ava Johnson", "Mason Davis"
        };

        for (int i = 0; i < names.length; i++) {
            String rollNumber = String.format("%03d", 101 + i);
            studentRepository.save(new Student(rollNumber, names[i]));
        }

        System.out.println(names.length + " sample students loaded into database");
    }

    private void loadSampleAttendanceData() {
        List<Student> students = studentRepository.findAll();
        Random random = new Random();

        // Generate attendance data for the last 30 days
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(29);

        int totalRecords = 0;

        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            // Skip weekends (Saturday = 6, Sunday = 7)
            if (date.getDayOfWeek().getValue() >= 6) {
                continue;
            }

            for (Student student : students) {
                // Generate realistic attendance patterns
                boolean isPresent;

                // Different attendance patterns for different students
                int studentIndex = students.indexOf(student);

                if (studentIndex < 5) {
                    // Excellent students (90-95% attendance)
                    isPresent = random.nextInt(100) < 93;
                } else if (studentIndex < 15) {
                    // Good students (80-90% attendance)
                    isPresent = random.nextInt(100) < 85;
                } else if (studentIndex < 20) {
                    // Average students (70-80% attendance)
                    isPresent = random.nextInt(100) < 75;
                } else {
                    // Poor attendance students (50-70% attendance)
                    isPresent = random.nextInt(100) < 60;
                }

                // Create attendance record
                Attendance attendance = new Attendance(student, date, isPresent);
                attendanceRepository.save(attendance);
                totalRecords++;
            }
        }

        System.out.println(totalRecords + " sample attendance records loaded into database");
        System.out.println("Sample data generation completed successfully!");

        // Print some statistics
        printAttendanceStatistics(students);
    }

    private void printAttendanceStatistics(List<Student> students) {
        System.out.println("\n=== ATTENDANCE STATISTICS ===");

        for (Student student : students.subList(0, Math.min(10, students.size()))) {
            Long totalDays = attendanceRepository.countTotalDaysByStudentId(student.getId());
            Long presentDays = attendanceRepository.countPresentDaysByStudentId(student.getId());

            double percentage = totalDays > 0 ? (presentDays.doubleValue() / totalDays.doubleValue()) * 100 : 0.0;

            System.out.printf("%-15s (%s): %d/%d days = %.1f%%%n",
                student.getName(),
                student.getRollNumber(),
                presentDays,
                totalDays,
                percentage);
        }

        System.out.println("... and " + (students.size() - 10) + " more students");
        System.out.println("===============================\n");
    }
} 