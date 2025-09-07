import React, { useState, useEffect } from 'react';

// API Service
const API_BASE_URL = '/api/attendance';

const apiService = {
  async markAttendance(data) {
    const response = await fetch(`${API_BASE_URL}/mark`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async getStudents() {
    const response = await fetch(`${API_BASE_URL}/students`);
    return response.json();
  },

  async getCumulativeRecords() {
    const response = await fetch(`${API_BASE_URL}/records`);
    return response.json();
  },

  async getDailyRecords(date) {
    const response = await fetch(`${API_BASE_URL}/records/${date}`);
    return response.json();
  },

  async getAttendanceDates() {
    const response = await fetch(`${API_BASE_URL}/dates`);
    return response.json();
  }
};

// Mark Attendance Component
const MarkAttendance = () => {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await apiService.getStudents();
      setStudents(data);
      // Initialize attendance state
      const initialAttendance = {};
      data.forEach(student => {
        initialAttendance[student.rollNumber] = false;
      });
      setAttendance(initialAttendance);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  const handleAttendanceChange = (rollNumber, present) => {
    setAttendance(prev => ({
      ...prev,
      [rollNumber]: present
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const records = Object.entries(attendance).map(([rollNumber, present]) => ({
        rollNumber,
        present
      }));

      const requestData = {
        date: selectedDate,
        records
      };

      const response = await apiService.markAttendance(requestData);
      setMessage(response.message);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error marking attendance');
      setTimeout(() => setMessage(''), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="attendance-container">
      <h2>Mark Attendance</h2>
      
      <div className="date-selector">
        <label>
          Select Date:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>
      </div>

      {message && <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}

      <div className="attendance-table">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Present/Absent</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.rollNumber}</td>
                <td>{student.name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={attendance[student.rollNumber] || false}
                    onChange={(e) => handleAttendanceChange(student.rollNumber, e.target.checked)}
                  />
                  <span className="checkbox-label">
                    {attendance[student.rollNumber] ? 'Present' : 'Absent'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button 
        className="submit-btn" 
        onClick={handleSubmit} 
        disabled={loading}
      >
        {loading ? 'Marking...' : 'Mark Attendance'}
      </button>
    </div>
  );
};

// View Records Component
const ViewRecords = () => {
  const [activeTab, setActiveTab] = useState('cumulative');
  const [cumulativeData, setCumulativeData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'cumulative') {
      loadCumulativeData();
    } else {
      loadDailyData();
    }
    loadAvailableDates();
  }, [activeTab]);

  const loadCumulativeData = async () => {
    setLoading(true);
    try {
      const data = await apiService.getCumulativeRecords();
      setCumulativeData(data);
    } catch (error) {
      console.error('Error loading cumulative data:', error);
    }
    setLoading(false);
  };

  const loadDailyData = async () => {
    setLoading(true);
    try {
      const data = await apiService.getDailyRecords(selectedDate);
      setDailyData(data);
    } catch (error) {
      console.error('Error loading daily data:', error);
    }
    setLoading(false);
  };

  const loadAvailableDates = async () => {
    try {
      const dates = await apiService.getAttendanceDates();
      setAvailableDates(dates);
    } catch (error) {
      console.error('Error loading dates:', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (activeTab === 'daily') {
      loadDailyData();
    }
  };

  return (
    <div className="records-container">
      <h2>View Attendance Records</h2>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'cumulative' ? 'active' : ''}`}
          onClick={() => setActiveTab('cumulative')}
        >
          Cumulative %
        </button>
        <button 
          className={`tab ${activeTab === 'daily' ? 'active' : ''}`}
          onClick={() => setActiveTab('daily')}
        >
          By Date
        </button>
      </div>

      {activeTab === 'daily' && (
        <div className="date-selector">
          <label>
            Select Date:
            <select 
              value={selectedDate} 
              onChange={(e) => handleDateChange(e.target.value)}
            >
              <option value={new Date().toISOString().split('T')[0]}>Today</option>
              {availableDates.map(date => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
          </label>
        </div>
      )}

      {loading && <div className="loading">Loading...</div>}

      <div className="records-table">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Roll Number</th>
              <th>Name</th>
              {activeTab === 'cumulative' ? (
                <th>Attendance %</th>
              ) : (
                <th>Status</th>
              )}
            </tr>
          </thead>
          <tbody>
            {(activeTab === 'cumulative' ? cumulativeData : dailyData).map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.rollNumber}</td>
                <td>{student.name}</td>
                <td>
                  {activeTab === 'cumulative' ? (
                    <span className="percentage">{student.attendancePercentage?.toFixed(2) || 0}%</span>
                  ) : (
                    <span className={`status ${student.present ? 'present' : 'absent'}`}>
                      {student.present ? 'Present' : 'Absent'}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('mark');

  return (
    <div className="app">
      <header className="app-header">
        <h1>Attendance Management System</h1>
        <nav className="navigation">
          <button 
            className={`nav-btn ${currentPage === 'mark' ? 'active' : ''}`}
            onClick={() => setCurrentPage('mark')}
          >
            Mark Attendance
          </button>
          <button 
            className={`nav-btn ${currentPage === 'records' ? 'active' : ''}`}
            onClick={() => setCurrentPage('records')}
          >
            View Records
          </button>
        </nav>
      </header>

      <main className="app-main">
        {currentPage === 'mark' ? <MarkAttendance /> : <ViewRecords />}
      </main>

      <style jsx>{`
        .app {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .app-header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .app-header h1 {
          margin: 0;
          color: #333;
          font-size: 2rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 1rem;
        }

        .navigation {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .nav-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 25px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .nav-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .nav-btn.active {
          background: linear-gradient(45deg, #764ba2, #667eea);
          box-shadow: 0 6px 20px rgba(118, 75, 162, 0.6);
        }

        .app-main {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .attendance-container, .records-container {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .attendance-container h2, .records-container h2 {
          color: #333;
          margin-bottom: 2rem;
          font-size: 1.8rem;
          font-weight: 600;
          text-align: center;
        }

        .date-selector {
          margin-bottom: 2rem;
          text-align: center;
        }

        .date-selector label {
          font-weight: 500;
          color: #555;
        }

        .date-selector input, .date-selector select {
          margin-left: 0.5rem;
          padding: 0.5rem;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          background: white;
          transition: border-color 0.3s ease;
        }

        .date-selector input:focus, .date-selector select:focus {
          outline: none;
          border-color: #667eea;
        }

        .message {
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          text-align: center;
          font-weight: 500;
        }

        .message.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .message.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .attendance-table, .records-table {
          overflow-x: auto;
          margin-bottom: 2rem;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        th {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        td {
          padding: 1rem;
          border-bottom: 1px solid #eee;
          color: #555;
          font-weight: 500;
        }

        tr:hover {
          background: #f8f9ff;
        }

        tr:last-child td {
          border-bottom: none;
        }

        .checkbox-label {
          margin-left: 0.5rem;
          font-weight: 500;
        }

        input[type="checkbox"] {
          transform: scale(1.2);
          margin-right: 0.5rem;
        }

        .submit-btn {
          display: block;
          margin: 0 auto;
          padding: 1rem 2rem;
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 25px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .tabs {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .tab {
          padding: 0.75rem 1.5rem;
          border: 2px solid #ddd;
          background: white;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          color: #666;
        }

        .tab.active {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .tab:hover:not(.active) {
          border-color: #667eea;
          color: #667eea;
        }

        .percentage {
          font-weight: 600;
          color: #667eea;
        }

        .status {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.8rem;
          text-transform: uppercase;
        }

        .status.present {
          background: #d4edda;
          color: #155724;
        }

        .status.absent {
          background: #f8d7da;
          color: #721c24;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          color: #666;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .app-main {
            padding: 1rem;
          }
          
          .attendance-container, .records-container {
            padding: 1rem;
          }
          
          .navigation {
            flex-direction: column;
            align-items: center;
          }
          
          table {
            font-size: 0.9rem;
          }
          
          th, td {
            padding: 0.75rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default App;