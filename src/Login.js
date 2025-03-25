import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login({setUser}){
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    
    try {
      const response = await axios.get(`http://localhost:3001/users?email=${email}&password=${password}`);
      if (response.data.length > 0) {
        setUser(response.data[0]);
        alert("Login Successful!");
        if (response.data[0].role === "admin") navigate("/admin");
        else if (response.data[0].role === "student") navigate("/student");
        else if (response.data[0].role === "faculty") navigate("/faculty");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-dark text-white">
      <div className="card p-4 shadow-lg" style={{ width: "24rem" }}>
        <h2 className="text-center text-primary mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input name="password" type="password" className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account? <a href="/register" className="text-primary">Register</a>
        </p>
      </div>
    </div>
  );
}
export default Login