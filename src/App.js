import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddUser from './components/AddUser';
import UpdateUser from './components/UpdateUser';
import DeleteUser from './components/DeleteUser';
import RetrieveUser from './components/RetrieveUser';
import ListUsers from './components/ListUsers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListUsers />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/update/:id" element={<UpdateUser />} />
        <Route path="/delete/:id" element={<DeleteUser />} />
        <Route path="/user/:id" element={<RetrieveUser />} />
      </Routes>
    </Router>
  );
}

export default App;
