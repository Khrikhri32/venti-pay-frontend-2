import React, { useState } from 'react';
import Login from '../components/Login';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import { getUserList } from '../services/api';
import { createUser } from '../services/api';

function FormLayout() {
  const [login, setLogin] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false); 
  const [users, setUsers] = useState([]);

  const handleLogin = async () => {
    getUserList()
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          console.error('Error fetching user list:', error);
        });
    setLogin(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setLogin(false);
  }

  const handleCreateForm = () => {
    setShowUserForm(prevShowUserForm => !prevShowUserForm);
  };
 
  const handleRegister = async (data) => {
    await createUser(data);
  }  

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-4">
          {login ? (
            <UserList users={users} onLogoutButton={handleLogout}/>
          ) : showUserForm ? ( 
            <UserForm onSubmit={handleRegister} onBackClick={handleCreateForm}/>
          ) : (
            <Login onLogin={handleLogin} onCreateUser={handleCreateForm} />
          )}
        </div>
      </div>
    </div>
  );
}

export default FormLayout;
