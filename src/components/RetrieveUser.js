


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RetrieveUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://apnaorganicstore.in/crud_api/user.php?id=${id}`);
        
        if (response.status === 200) {
          setUser(response.data); 
        } else if (response.status === 400) {
          alert('Bad Request: ID parameter is missing or invalid.');
        } else if (response.status === 404) {
          alert('User not found with the given ID.');
        } else if (response.status === 500) {
          alert('Internal Server Error: Error retrieving user details.');
        }
      } catch (error) {
        console.error('Error retrieving user:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div className="container my-4">
      {user ? (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">User Details</h2>
            <div className="row mb-2">
              <div className="col-md-2"><strong>ID:</strong></div>
              <div className="col-md-8">{user.id}</div>
            </div>
            <div className="row mb-2">
              <div className="col-md-2"><strong>Username:</strong></div>
              <div className="col-md-8">{user.username}</div>
            </div>
            <div className="row mb-2">
              <div className="col-md-2"><strong>Email:</strong></div>
              <div className="col-md-8">{user.email}</div>
            </div>
            <div className="row mb-2">
              <div className="col-md-2"><strong>Name:</strong></div>
              <div className="col-md-8">{user.name}</div>
            </div>
            <div className="row mb-2">
              <div className="col-md-2"><strong>Date of Birth:</strong></div>
              <div className="col-md-8">{user.date_of_birth}</div>
            </div>
            <div className="row mb-2">
              <div className="col-md-2"><strong>Phone Number:</strong></div>
              <div className="col-md-8">{user.phone_number}</div>
            </div>
            <div className="row mb-2">
              <div className="col-md-2"><strong>Address:</strong></div>
              <div className="col-md-8">{user.address}</div>
            </div>
            <div className="row mb-2">
              <div className="col-md-2"><strong>Role:</strong></div>
              <div className="col-md-8">{user.role}</div>
            </div>
          </div>
        </div>
      ) : (
        <div>No user found or there was an error.</div>
      )}
    </div>
  );
}

export default RetrieveUser;
