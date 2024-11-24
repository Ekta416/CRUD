

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(5); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [sortBy, setSortBy] = useState(''); 
  const [sortOrder, setSortOrder] = useState('asc'); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://apnaorganicstore.in/crud_api/users.php');

        if (response.status === 200) {
          setUsers(response.data); 
          setFilteredUsers(response.data); 
        } else if (response.status === 400) {
          alert('Bad Request: Invalid parameters provided.');
        } else if (response.status === 500) {
          alert('Internal Server Error: Error retrieving users.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    };

    fetchUsers();
  }, []);

  // Filter 
  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(lowercasedTerm) ||
        user.email.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); 
  }, [searchTerm, users]);

  // Sort users 
  useEffect(() => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (sortBy) {
        const fieldA = a[sortBy]?.toString().toLowerCase() || '';
        const fieldB = b[sortBy]?.toString().toLowerCase() || '';

        if (sortOrder === 'asc') {
          return fieldA > fieldB ? 1 : fieldA < fieldB ? -1 : 0;
        } else {
          return fieldA < fieldB ? 1 : fieldA > fieldB ? -1 : 0;
        }
      }
      return 0;
    });
    setFilteredUsers(sortedUsers);
  }, [sortBy, sortOrder]);

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(filteredUsers.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>User List</h2>
        <Link className="btn btn-primary mb-5" to="/add">
          Add User
        </Link>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="d-flex justify-content-between">
          <div>
            <label htmlFor="sortBy" className="mr-2">Sort By:</label>
            <select
              id="sortBy"
              className="form-control d-inline-block w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">None</option>
              <option value="username">Username</option>
              <option value="email">Email</option>
              <option value="date_of_birth">Date of Birth</option>
              <option value="role">Role</option>
            </select>
          </div>
          <div>
            <label htmlFor="sortOrder" className="mr-2">Order:</label>
            <select
              id="sortOrder"
              className="form-control d-inline-block w-auto"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      <table className="table table-striped table-bordered mb-10">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.date_of_birth}</td>
                <td>{user.phone_number}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
                <td>
                  <Link className="btn btn-sm btn-info mr-2" to={`/user/${user.id}`}>
                    View
                  </Link>
                  <Link className="btn btn-sm btn-warning mr-2" to={`/update/${user.id}`}>
                    Edit
                  </Link>
                  <Link className="btn btn-sm btn-danger" to={`/delete/${user.id}`}>
                    Delete
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>

          {Array.from({ length: Math.ceil(filteredUsers.length / itemsPerPage) }).map((_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === Math.ceil(filteredUsers.length / itemsPerPage) ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={handleNext}
              disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default ListUsers;
