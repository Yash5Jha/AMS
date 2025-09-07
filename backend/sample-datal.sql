-- Sample Data for Attendance Management System
-- Execute this script after creating the database schema

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS attendance_db;
USE attendance_db;

-- Clear existing data (optional)
-- DELETE FROM attendance;
-- DELETE FROM students;

-- Insert sample students
INSERT INTO students (roll_number, name) VALUES 
('101', 'John Doe'),
('102', 'Jane Smith'),
('103', 'Mike Johnson'),
('104', 'Sarah Wilson'),
('105', 'David Brown'),
('106', 'Emily Davis'),
('107', 'Alex Miller'),
('108', 'Lisa Garcia'),
('109', 'Tom Anderson'),
('110', 'Anna Martinez'),
('111', 'Chris Taylor'),
('112', 'Rachel Green'),
('113', 'Kevin Lee'),
('114', 'Sophie Chen'),
('115', 'Daniel White'),
('116', 'Maya Patel'),
('117', 'Ryan Murphy'),
('118', 'Olivia Jones'),
('119', 'Ethan Clark'),
('120', 'Grace Kim'),
('121', 'Lucas Rodriguez'),
('122', 'Zoe Thompson'),
('123', 'Noah Williams'),
('124', 'Ava Johnson'),
('125', 'Mason Davis');

-- Insert sample attendance data for the last 20 days (excluding weekends)
-- Note: Adjust dates as needed based on current date

-- Sample attendance for 2025-09-03 (Today)
INSERT INTO attendance (student_id, date, status) VALUES
(1, '2025-09-03', TRUE),   -- John Doe - Present
(2, '2025-09-03', TRUE),   -- Jane Smith - Present
(3, '2025-09-03', FALSE),  -- Mike Johnson - Absent
(4, '2025-09-03', TRUE),   -- Sarah Wilson - Present
(5, '2025-09-03', TRUE),   -- David Brown - Present
(6, '2025-09-03', FALSE),  -- Emily Davis - Absent
(7, '2025-09-03', TRUE),   -- Alex Miller - Present
(8, '2025-09-03', TRUE),   -- Lisa Garcia - Present
(9, '2025-09-03', TRUE),   -- Tom Anderson - Present
(10, '2025-09-03', FALSE), -- Anna Martinez - Absent
(11, '2025-09-03', TRUE),  -- Chris Taylor - Present
(12, '2025-09-03', TRUE),  -- Rachel Green - Present
(13, '2025-09-03', FALSE), -- Kevin Lee - Absent
(14, '2025-09-03', TRUE),  -- Sophie Chen - Present
(15, '2025-09-03', TRUE),  -- Daniel White - Present
(16, '2025-09-03', TRUE),  -- Maya Patel - Present
(17, '2025-09-03', FALSE), -- Ryan Murphy - Absent
(18, '2025-09-03', TRUE),  -- Olivia Jones - Present
(19, '2025-09-03', TRUE),  -- Ethan Clark - Present
(20, '2025-09-03', FALSE), -- Grace Kim - Absent
(21, '2025-09-03', TRUE),  -- Lucas Rodriguez - Present
(22, '2025-09-03', TRUE),  -- Zoe Thompson - Present
(23, '2025-09-03', FALSE), -- Noah Williams - Absent
(24, '2025-09-03', TRUE),  -- Ava Johnson - Present
(25, '2025-09-03', TRUE);  -- Mason Davis - Present

-- Sample attendance for 2025-09-02
INSERT INTO attendance (student_id, date, status) VALUES
(1, '2025-09-02', TRUE), (2, '2025-09-02', FALSE), (3, '2025-09-02', TRUE), 
(4, '2025-09-02', TRUE), (5, '2025-09-02', TRUE), (6, '2025-09-02', TRUE), 
(7, '2025-09-02', FALSE), (8, '2025-09-02', TRUE), (9, '2025-09-02', TRUE), 
(10, '2025-09-02', TRUE), (11, '2025-09-02', TRUE), (12, '2025-09-02', FALSE), 
(13, '2025-09-02', TRUE), (14, '2025-09-02', TRUE), (15, '2025-09-02', FALSE), 
(16, '2025-09-02', TRUE), (17, '2025-09-02', TRUE), (18, '2025-09-02', TRUE), 
(19, '2025-09-02', FALSE), (20, '2025-09-02', TRUE), (21, '2025-09-02', TRUE), 
(22, '2025-09-02', FALSE), (23, '2025-09-02', TRUE), (24, '2025-09-02', TRUE), 
(25, '2025-09-02', TRUE);

-- Sample attendance for 2025-08-30
INSERT INTO attendance (student_id, date, status) VALUES
(1, '2025-08-30', TRUE), (2, '2025-08-30', TRUE), (3, '2025-08-30', FALSE), 
(4, '2025-08-30', TRUE), (5, '2025-08-30', FALSE), (6, '2025-08-30', TRUE), 
(7, '2025-08-30', TRUE), (8, '2025-08-30', TRUE), (9, '2025-08-30', FALSE), 
(10, '2025-08-30', TRUE), (11, '2025-08-30', FALSE), (12, '2025-08-30', TRUE), 
(13, '2025-08-30', TRUE), (14, '2025-08-30', FALSE), (15, '2025-08-30', TRUE), 
(16, '2025-08-30', TRUE), (17, '2025-08-30', FALSE), (18, '2025-08-30', TRUE), 
(19, '2025-08-30', TRUE), (20, '2025-08-30', TRUE), (21, '2025-08-30', FALSE), 
(22, '2025-08-30', TRUE), (23, '2025-08-30', TRUE), (24, '2025-08-30', FALSE), 
(25, '2025-08-30', TRUE);

-- Sample attendance for 2025-08-29
INSERT INTO attendance (student_id, date, status) VALUES
(1, '2025-08-29', TRUE), (2, '2025-08-29', TRUE), (3, '2025-08-29', TRUE), 
(4, '2025-08-29', FALSE), (5, '2025-08-29', TRUE), (6, '2025-08-29', FALSE), 
(7, '2025-08-29', TRUE), (8, '2025-08-29', TRUE), (9, '2025-08-29', TRUE), 
(10, '2025-08-29', FALSE), (11, '2025-08-29', TRUE), (12, '2025-08-29', TRUE), 
(13, '2025-08-29', FALSE), (14, '2025-08-29', TRUE), (15, '2025-08-29', TRUE), 
(16, '2025-08-29', FALSE), (17, '2025-08-29', TRUE), (18, '2025-08-29', FALSE), 
(19, '2025-08-29', TRUE), (20, '2025-08-29', TRUE), (21, '2025-08-29', TRUE), 
(22, '2025-08-29', FALSE), (23, '2025-08-29', TRUE), (24, '2025-08-29', TRUE), 
(25, '2025-08-29', FALSE);

-- Sample attendance for 2025-08-28
INSERT INTO attendance (student_id, date, status) VALUES
(1, '2025-08-28', FALSE), (2, '2025-08-28', TRUE), (3, '2025-08-28', TRUE), 
(4, '2025-08-28', TRUE), (5, '2025-08-28', TRUE), (6, '2025-08-28', TRUE), 
(7, '2025-08-28', FALSE), (8, '2025-08-28', FALSE), (9, '2025-08-28', TRUE), 
(10, '2025-08-28', TRUE), (11, '2025-08-28', TRUE), (12, '2025-08-28', TRUE), 
(13, '2025-08-28', TRUE), (14, '2025-08-28', FALSE), (15, '2025-08-28', TRUE), 
(16, '2025-08-28', TRUE), (17, '2025-08-28', TRUE), (18, '2025-08-28', TRUE), 
(19, '2025-08-28', FALSE), (20, '2025-08-28', FALSE), (21, '2025-08-28', TRUE), 
(22, '2025-08-28', TRUE), (23, '2025-08-28', FALSE), (24, '2025-08-28', TRUE), 
(25, '2025-08-28', TRUE);

-- Verify the data
SELECT 'Students Count' as Info, COUNT(*) as Count FROM students
UNION ALL
SELECT 'Attendance Records Count', COUNT(*) FROM attendance
UNION ALL
SELECT 'Unique Dates', COUNT(DISTINCT date) FROM attendance;

-- Sample queries to test the system
-- 1. Get cumulative attendance percentages
SELECT 
    s.roll_number,
    s.name,
    COUNT(a.id) as total_days,
    SUM(CASE WHEN a.status = TRUE THEN 1 ELSE 0 END) as present_days,
    ROUND((SUM(CASE WHEN a.status = TRUE THEN 1 ELSE 0 END) / COUNT(a.id)) * 100, 2) as attendance_percentage
FROM students s
LEFT JOIN attendance a ON s.id = a.student_id
GROUP BY s.id, s.roll_number, s.name
ORDER BY s.roll_number;

-- 2. Get attendance for a specific date
SELECT 
    s.roll_number,
    s.name,
    COALESCE(a.status, FALSE) as present
FROM students s
LEFT JOIN attendance a ON s.id = a.student_id AND a.date = '2025-09-03'
ORDER BY s.roll_number;

-- 3. Get all dates with attendance records
SELECT DISTINCT date 
FROM attendance 
ORDER BY date DESC;