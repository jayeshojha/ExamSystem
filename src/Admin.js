import axios from "axios";
import { useEffect, useState } from "react";
function AdminDashboard(){
  const [exams, setExams] = useState([]);
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/exams").then((res) => setExams(res.data));
    axios.get("http://localhost:3001/users").then((res) => setUsers(res.data));
    axios.get("http://localhost:3001/results").then((res) => setResults(res.data));
  }, []);

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      <h2 className="text-primary fw-bold mb-4">Admin Dashboard</h2>
      <div className="card p-4 shadow-lg w-75">
        <p className="fs-5 text-center">Manage Exams, Users, and Results</p>
        <div className="mt-3">
          <h4 className="text-primary">Manage Exams</h4>
          <ul className="list-group">
            {exams.map((exam) => (
              <li key={exam.id} className="list-group-item d-flex justify-content-between align-items-center">
                {exam.title}
                <button className="btn btn-sm btn-danger">Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h4 className="text-success">Manage Users</h4>
          <ul className="list-group">
            {users.map((user) => (
              <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                {user.name} ({user.role})
                <button className="btn btn-sm btn-danger">Remove</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h4 className="text-danger">View Results</h4>
          <ul className="list-group">
            {results.length > 0 ? (
              results.map((result, index) => (
                <li key={index} className="list-group-item">
                  Exam {result.examId}: {result.studentName} - Score {result.score}/100
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">No results available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard