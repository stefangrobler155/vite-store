import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser, logoutUser } from '../utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Auth() {
  const [logInData, setLoginData] = useState({
    loginUsername: '',
    loginPassword: '',
  });
  const [signUpData, setSignUpData] = useState({
    signupName: '',
    signupEmail: '',
    signupUsername: '',
    signupPassword: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    if (!logInData.loginUsername || !logInData.loginPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      const token = await loginUser(logInData.loginUsername, logInData.loginPassword);
      localStorage.setItem('jwt', token);
      setLoginData({
        loginUsername: '',
        loginPassword: '',
      });
      setIsLoggedIn(true);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleChangeSignup = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const signupSubmit = async (e) => {
    e.preventDefault();
    if (!signUpData.signupName || !signUpData.signupEmail || !signUpData.signupUsername || !signUpData.signupPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      await registerUser({
        name: signUpData.signupName,
        email: signUpData.signupEmail,
        userName: signUpData.signupUsername,
        password: signUpData.signupPassword,
      });
      setSignUpData({
        signupName: '',
        signupEmail: '',
        signupUsername: '',
        signupPassword: '',
      });
      toast.success('User signed up successfully!');
    } catch (error) {
      toast.error('Signup failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      toast.success('Logged out successfully!');
      navigate('/auth');
    } catch (error) {
      toast.error('Logout failed: ' + error.message);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="my-4 text-center">Login / Signup</h1>
        <div className="row">
          {!isLoggedIn ? (
            <>
              {/* Login */}
              <div className="col-md-6">
                <h2>Login</h2>
                <form onSubmit={loginSubmit}>
                  <div className="mb-3">
                    <label htmlFor="loginUsername" className="form-label">Username</label>
                    <input
                      type="text"
                      id="loginUsername"
                      name="loginUsername"
                      value={logInData.loginUsername}
                      className="form-control"
                      placeholder="Enter username"
                      onChange={handleLoginChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">Password</label>
                    <input
                      type="password"
                      id="loginPassword"
                      name="loginPassword"
                      value={logInData.loginPassword}
                      className="form-control"
                      placeholder="Enter password"
                      onChange={handleLoginChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Login</button>
                </form>
              </div>
              {/* Signup */}
              <div className="col-md-6">
                <h2>Signup</h2>
                <form onSubmit={signupSubmit}>
                  <div className="mb-3">
                    <label htmlFor="signupName" className="form-label">Name</label>
                    <input
                      type="text"
                      id="signupName"
                      name="signupName"
                      value={signUpData.signupName}
                      className="form-control"
                      placeholder="Enter name"
                      onChange={handleChangeSignup}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="signupEmail" className="form-label">Email</label>
                    <input
                      type="email"
                      id="signupEmail"
                      name="signupEmail"
                      value={signUpData.signupEmail}
                      className="form-control"
                      placeholder="Enter email"
                      onChange={handleChangeSignup}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="signupUsername" className="form-label">Username</label>
                    <input
                      type="text"
                      id="signupUsername"
                      name="signupUsername"
                      value={signUpData.signupUsername}
                      className="form-control"
                      placeholder="Enter username"
                      onChange={handleChangeSignup}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="signupPassword" className="form-label">Password</label>
                    <input
                      type="password"
                      id="signupPassword"
                      name="signupPassword"
                      value={signUpData.signupPassword}
                      className="form-control"
                      placeholder="Enter password"
                      onChange={handleChangeSignup}
                    />
                  </div>
                  <button type="submit" className="btn btn-success mt-3">Signup</button>
                </form>
              </div>
            </>
          ) : (
            <div className="col-12 text-center">
              <h2>Welcome, User!</h2>
              <button className="btn btn-danger mt-3" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}