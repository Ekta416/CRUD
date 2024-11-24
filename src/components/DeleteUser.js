
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DeleteUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://apnaorganicstore.in/crud_api/add_update.php?id=${id}`);
      if (response.status === 200) {
        alert('User deleted successfully!');
        navigate('/');
      } else if (response.status === 400) {
        alert('Bad Request: ID parameter is missing or invalid.');
      } else if (response.status === 404) {
        alert('User not found with the given ID.');
      } else if (response.status === 500) {
        alert('Internal Server Error: Error deleting user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Are you sure you want to delete this user?</h1>
      <button onClick={handleDelete} className="btn btn-danger">
        Delete User
      </button>
    </div>
  );
}

export default DeleteUser;
