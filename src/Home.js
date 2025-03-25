import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home({user}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "student") navigate("/student");
      else if (user.role === "faculty") navigate("/faculty");
    }
  }, [user, navigate]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-4 text-primary fw-bold">Welcome to the Online Examination System</h1>
        <p className="lead text-secondary">Take exams from anywhere, anytime.</p>
        <div className="mt-4">
          <a href="/login" className="btn btn-primary btn-lg me-3">Login</a>
          <a href="/register" className="btn btn-success btn-lg">Register</a>
        </div>
      </div>
    </div>
  );
  }
  export default Home