import React, {useState}  from "react";
import "./LoginForm.css";
import { FaUser, FaClock } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const response = await fetch('https://example.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      // Redirect to the dashboard or another protected page
      window.location.href = '/dashboard';
    } else {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <input type="email" 
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
             />
            <FaClock className="icon" />
          </div>

          <div className="member-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit">Login</button>

          <div className="register-link">
            <p>
              Don't have an account? <a href="#">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
