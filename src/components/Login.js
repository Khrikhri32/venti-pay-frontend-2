import React, { useState } from 'react';
import { login } from '../services/api';

const Login = ({onLogin, onCreateUser}) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    const { username, password } = formData;

    const res = await login({user:username, pass:password})
    .then((response)=>{
        switch(response.data.status){
            case 200:
                setError(null);
                localStorage.setItem('token', response.data.token);
                onLogin();
                break;
            case 401:
                setError('Login failed. Please check your credentials.');
                break;
            default:
                setError('Login failed');
                break;
        }
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleLogin}>
                  Login
                </button>
                
                <p className="mt-2">
                Don't have an account?{' '}
                    <a href="#" onClick={onCreateUser} className="text-decoration-none text-primary cursor-pointer">
                        Register
                    </a>
                </p>
              </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
