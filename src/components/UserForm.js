import React, { useState } from 'react';

function UserForm({onSubmit, onBackClick}) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputFocus = (e) => {
    const { name } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate the form before submitting
    const newErrors = {};
    let hasErrors = false;

    if (!userData.name) {
      newErrors.name = 'Name is required';
      hasErrors = true;
    }

    if (!userData.email) {
      newErrors.email = 'Email is required';
      hasErrors = true;
    }

    if (!userData.phone) {
      newErrors.phone = 'Phone is required';
      hasErrors = true;
    }

    if (!userData.address) {
      newErrors.address = 'Address is required';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
    }  else {
        onSubmit(userData);
        setErrors({
          name: '',
          email: '',
          phone: '',
          address: '',
        });
      }
  };
  
  return (
    <div className="container">
      <div>
        <h2>User Details Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={userData.name}
              onChange={handleChange}
              onFocus={handleInputFocus}
            />
            <span className="text-danger">{errors.name}</span>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={userData.email}
              onChange={handleChange}
              onFocus={handleInputFocus}
            />
            <span className="text-danger">{errors.email}</span>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control"
              value={userData.phone}
              onChange={handleChange}
              onFocus={handleInputFocus}
            />
            <span className="text-danger">{errors.phone}</span>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              value={userData.address}
              onChange={handleChange}
              onFocus={handleInputFocus}
            />
            <span className="text-danger">{errors.address}</span>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button className="btn btn-primary" onClick={onBackClick}>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
