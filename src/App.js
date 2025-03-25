
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import AdminDashboard from "./Admin";
import StudentDashboard from "./Student";
import ExamPage from "./Exampage";
import FacultyDashboard from "./Faculty";
function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={user?.role === "admin" ? <AdminDashboard /> : <Login setUser={setUser} />} />
        <Route path="/student" element={user?.role === "student" ? <StudentDashboard /> : <Login setUser={setUser} />} />
        <Route path="/faculty" element={user?.role === "faculty" ? <FacultyDashboard /> : <Login setUser={setUser} />} />
        <Route path="/exam/:id" element={user ? <ExamPage /> : <Login setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
