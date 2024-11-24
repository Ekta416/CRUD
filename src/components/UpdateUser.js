import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "", 
    username: "",
    email: "",
    password: "",
    name: "",
    date_of_birth: "",
    address: "",
    phone_number: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
      const response = await axios.put(
         "https://apnaorganicstore.in/crud_api/add_update.php",
        formData
      );
  
       if (response.status === 200) {
        alert("200 OK: User updated successfully.");
         navigate('/');
      } else if (response.status === 400) {
        alert("400 Bad Request: ID parameter is missing or invalid.");
      } else if (response.status === 404) {
        alert("404 Not Found: User not found with the given ID.");
      } else if (response.status === 500) {
        alert("500 Internal Server Error: Error updating user.");
      } else {
        alert("Unexpected response from the server.");
      }
  
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert("400 Bad Request: ID parameter is missing or invalid.");
        } else if (error.response.status === 404) {
          alert("404 Not Found: User not found with the given ID.");
        } else if (error.response.status === 500) {
          alert("500 Internal Server Error: Error updating user.");
        } else {
          alert("An unexpected error occurred.");
        }
      } else {
        alert("Failed to update user. Please try again.");
      }
    }
  };
  return (
    <div className="container-fluid">
    <h1 style={{ margin: '10px'}}>Add User</h1>
<form onSubmit={handleSubmit}>
        <div className="form-row">
        <div className="form-group col-md-6">
            <label htmlFor="UserId">UserId</label>
            <input
              type="text"
              className="form-control"
              id="UserId"
              name="id"
              placeholder="User Id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputUserName">Username</label>
            <input
              type="text"
              className="form-control"
              id="inputUserName"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              
            />
          </div>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputName">Name</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            id="dateOfBirth"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputAddress">Address</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="selectRole">Role</label>
            <select
              id="selectRole"
              className="form-control"
              name="role"
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Udate User
        </button>
      </form>
    </div>
  );
}


export default UpdateUser;
