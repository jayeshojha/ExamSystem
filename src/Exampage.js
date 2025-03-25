import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
function ExamPage({user}){
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/questions?examId=${id}`).then((res) => setQuestions(res.data));
  }, [id]);

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setSelectedAnswer(null);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setSubmitted(true);
      saveResult();
    }
  };

  const saveResult = async () => {
    try {
      await axios.post("http://localhost:3001/results", {
        studentId: user.id,
        studentName: user.name,
        examId: id,
        score: (score / questions.length) * 100,
      });
      alert("Exam submitted successfully!");
      navigate("/student");
    } catch (error) {
      console.error("Error saving result:", error);
    }
  };

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      <h2 className="text-danger fw-bold mb-4">Exam {id}</h2>
      {submitted ? (
        <div className="card p-4 shadow-lg w-50 text-center">
          <h3 className="text-success">Exam Completed</h3>
          <p className="fs-5">Your Score: {score}/{questions.length}</p>
        </div>
      ) : questions.length > 0 ? (
        <div className="card p-4 shadow-lg w-50 text-center">
          <h3 className="fs-4">{questions[currentQuestion].question}</h3>
          <div className="mt-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => setSelectedAnswer(option)} className={`btn w-100 mb-2 ${selectedAnswer === option ? 'btn-primary' : 'btn-outline-secondary'}`}>{option}</button>
            ))}
          </div>
          <button onClick={handleNext} className="btn btn-success mt-4 w-100">{currentQuestion + 1 === questions.length ? 'Submit' : 'Next'}</button>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}
export default ExamPage