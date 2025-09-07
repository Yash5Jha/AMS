# AMS - Attendance Management System

A full-stack attendance management application built with Spring Boot, React, and MySQL.

## Tech Stack

**Backend:**
- Java 11+
- Spring Boot 2.x
- Spring Security
- Spring Data JPA
- Maven
- MySQL

**Frontend:**
- React.js
- JavaScript (ES6+)
- HTML5/CSS3
- Axios (HTTP client)

**Database:**
- MySQL 8.0+

## Prerequisites

- Java JDK 11 or higher
- Node.js 14+ and npm
- MySQL Server 8.0+
- Git

## Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/Yash5Jha/AMS.git
cd AMS
```

### 2. Database Setup
```sql
-- Login to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE ams_db;

-- Exit MySQL
exit
```

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Update database credentials in src/main/resources/application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/ams_db
spring.datasource.username=root
spring.datasource.password=your_mysql_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

server.port=8080

# Build and run
./mvnw clean install
./mvnw spring-boot:run
```

**Windows users:**
```cmd
mvnw.cmd clean install
mvnw.cmd spring-boot:run
```

### 4. Frontend Setup
```bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

### 5. Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

## API Endpoints

**Base URL:** `http://localhost:8080/api/attendance`

### Attendance Management
- `POST /api/attendance/mark` - Mark attendance for multiple students on a specific date
- `GET /api/attendance/records` - Get cumulative attendance percentages for all students
- `GET /api/attendance/records/{date}` - Get daily attendance records for a specific date (YYYY-MM-DD format)
- `GET /api/attendance/students` - Get list of all students
- `GET /api/attendance/dates` - Get list of all dates where attendance has been recorded

### API Request/Response Examples

**Mark Attendance (POST /api/attendance/mark):**
```json
// Request
{
  "date": "2025-09-05",
  "records": [
    {"rollNumber": "101", "present": true},
    {"rollNumber": "102", "present": false},
    {"rollNumber": "103", "present": true}
  ]
}

// Response
{
  "message": "Attendance marked successfully for 2025-09-05"
}
```

**Get Cumulative Records (GET /api/attendance/records):**
```json
[
  {
    "id": 1,
    "rollNumber": "101",
    "name": "John Doe",
    "attendancePercentage": 92.86,
    "present": null
  }
]
```

**Get Daily Records (GET /api/attendance/records/2025-09-05):**
```json
[
  {
    "id": 1,
    "rollNumber": "101",
    "name": "John Doe",
    "attendancePercentage": null,
    "present": true
  }
]
```

## Default Ports
- Backend: 8080
- Frontend: 3000
- MySQL: 3306

## Troubleshooting

**Backend won't start:**
- Check if Java 11+ is installed: `java --version`
- Verify MySQL is running: `sudo service mysql status`
- Check database connection in application.properties

**Frontend won't start:**
- Check Node.js version: `node --version`
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

**Database connection issues:**
- Ensure MySQL service is running
- Verify database credentials in application.properties
- Check if ams_db database exists

**Port conflicts:**
- Backend: Change server.port in application.properties
- Frontend: Set PORT environment variable: `PORT=3001 npm start`
