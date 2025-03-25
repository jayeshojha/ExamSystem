import axios from "axios";
import { useEffect, useState } from "react";
function FacultyDashboard(){
  const [questions, setQuestions] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/questions").then((res) => setQuestions(res.data));
    axios.get("http://localhost:3001/exams").then((res) => setExams(res.data));
  }, []);

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      <h2 className="text-purple fw-bold mb-4">Faculty Dashboard</h2>
      <div className="card p-4 shadow-lg w-75">
        <p className="fs-5 text-center">Manage Questions and Exams</p>
        <div className="mt-3">
          <h4 className="text-primary">Manage Questions</h4>
          <ul className="list-group">
            {questions.map((question) => (
              <li key={question.id} className="list-group-item d-flex justify-content-between align-items-center">
                {question.question}
                <button className="btn btn-sm btn-danger">Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h4 className="text-success">Manage Exams</h4>
          <ul className="list-group">
            {exams.map((exam) => (
              <li key={exam.id} className="list-group-item d-flex justify-content-between align-items-center">
                {exam.title}
                <button className="btn btn-sm btn-danger">Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default FacultyDashboard