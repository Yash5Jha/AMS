package com.attendance.repository;

import com.attendance.entity.Attendance;
import com.attendance.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    
    List<Attendance> findByDate(LocalDate date);
    
    Optional<Attendance> findByStudentAndDate(Student student, LocalDate date);
    
    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.student.id = :studentId AND a.status = true")
    Long countPresentDaysByStudentId(@Param("studentId") Long studentId);
    
    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.student.id = :studentId")
    Long countTotalDaysByStudentId(@Param("studentId") Long studentId);
    
    @Query("SELECT DISTINCT a.date FROM Attendance a ORDER BY a.date DESC")
    List<LocalDate> findAllDistinctDates();
}