import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function StudentDashboard(){
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/exams")
      .then((res) => {
        console.log("Exams Data:", res.data); 
        setExams(res.data);
      })
      .catch((err) => console.error("Error fetching exams:", err));
  
    axios.get("http://localhost:3001/results")
      .then((res) => {
        console.log("Results Data:", res.data); 
        setResults(res.data);
      })
      .catch((err) => console.error("Error fetching results:", err));
  }, []);
  

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      <h2 className="text-success fw-bold mb-4">Student Dashboard</h2>
      <div className="card p-4 shadow-lg w-50">
        <p className="fs-5 text-center">Take Exams and View Results</p>
        <div className="mt-3">
          <h4 className="text-primary">Available Exams</h4>
          <ul className="list-group">
            {exams.map((exam) => (
              <li key={exam.id} className="list-group-item d-flex justify-content-between align-items-center">
                {exam.title}
                <Link to={`/exam/${exam.id}`} className="btn btn-sm btn-primary">Take Exam</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h4 className="text-success">Your Results</h4>
          <ul className="list-group">
            {results.length > 0 ? (
              results.map((result, index) => (
                <li key={index} className="list-group-item">
                  Exam {result.examId}: Score - {result.score}/100
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
export default StudentDashboard