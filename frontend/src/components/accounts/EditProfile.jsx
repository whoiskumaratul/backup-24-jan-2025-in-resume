import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Theuser, ThesetUser] = useState(null);
  

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/profile', {
          credentials: 'include',
        });
        // const { data } = await axios.get('http://localhost:8000/api/profile', {
        //     withCredentials: true,
        //   });
        const data = await response.json();

        if (!data.status) {
          navigate('/login');
        }

        ThesetUser(data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    getUser();
  }, [navigate]);

  if (!Theuser) {
    return <>Loading....</>;
  }

  const handleChange = (e) => {
    ThesetUser({
      ...Theuser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('jwt'); // Retrieve token
      const response = await axios.put(
        `http://localhost:8000/api/profile/${id}`,
        Theuser,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token
          },
        }
      );
      console.log('Update successful:', response.data);
       navigate('/profile', { state: { refresh: true } }); // Navigate after successful update
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
    }
  };
  

  return (
    <div>
      <div className="grid lg:grid-cols-1 w-full ml-auto mr-auto">
        <form>
          <label>
            Name
            <input
              type="text"
              value={Theuser?.name || ''}
              name="name"
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSubmit}>Edit</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
